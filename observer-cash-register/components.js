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

    removeItem(item) {
        this.items = this.items.filter(element => element !== item)
        this.notify()
    }
}

class ItemsList extends Observer {
    update() {
        this.tag.innerHTML = ""

        this.subject.items.forEach(item => {
            let articleTag = document.createElement("article")
            let articleLbl = document.createElement("label")
            let separatorLbl = document.createElement("label")
            let priceLbl = document.createElement("label")
            let removeBtn = document.createElement("button")

            articleLbl.innerHTML = item.article
            priceLbl.innerHTML = `$ ${parseFloat(item.price)}`
            separatorLbl.innerHTML = " : "
            removeBtn.innerHTML = "X"

            this.appendChilds(articleTag, articleLbl, separatorLbl, priceLbl, removeBtn)
            this.tag.appendChild(articleTag)

            /*
                The context of 'this' inside an arrow function is the instance not the 
                button because arrow functions do not change the context of word 'this'
            */
            removeBtn.addEventListener("click", evt => {
                this.subject.removeItem(item)
            })
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
