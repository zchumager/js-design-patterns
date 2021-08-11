class Observer {
    constructor(tag) {
        this.tag = tag
    }
}

class Subject {
    observers = []

    attach(observer) {
        observer.subject = this
        this.observers.push(observer)
    }

    detach(observer) {
        observer.subject = null
        this.observers = this.observers.filter(e => e !== observer)
    }

    notify() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
}

class Purchase extends Subject {
    items = []

    addItem(item) {
        this.items.push(item)
        this.notify()
    }
}

class ItemsList extends Observer {
    update() {
        this.tag.innerHTML = ""

        this.subject.items.forEach(item => {
            let articleTag = document.createElement("article")
            let articleLbl = document.createElement("label")
            let priceLbl = document.createElement("label")
            let separatorLbl = document.createElement("label")

            articleLbl.innerHTML = item.article
            priceLbl.innerHTML = `$ ${parseFloat(item.price)}`
            separatorLbl.innerHTML = " : "

            this.appendChilds(articleTag, articleLbl, separatorLbl, priceLbl)

            this.tag.appendChild(articleTag)
        })
    }

    appendChilds(div, ...childs) {
        childs.forEach(child => {
            div.appendChild(child)
        })
    }
}

class PriceCounter extends Observer{
    update() {
        this.tag.innerHTML = ""

        let total = this.subject.items.reduce((counter, current) => counter + parseFloat(current.price), 0)
        
        this.tag.innerHTML = `Total $ ${total}`
    }
}
