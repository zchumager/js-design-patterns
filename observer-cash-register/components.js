class Observer {
    constructor(tag) {
        this.tag = tag
    }

    update() {
        console.log("TO BE IMPLEMENTED")
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
            let articleLabel = document.createElement("label")
            let priceLabel = document.createElement("label")
            let separatorLabel = document.createElement("label")

            articleLabel.innerHTML = item.article
            priceLabel.innerHTML = parseFloat(item.price)
            separatorLabel.innerHTML = " : "

            articleTag.appendChild(articleLabel)
            articleTag.appendChild(separatorLabel)
            articleTag.appendChild(priceLabel)

            this.tag.appendChild(articleTag)
        })
    }
}

class PriceCounter extends Observer{
    update() {
        this.tag.innerHTML = ""

        let total = this.subject.items.reduce((counter, current) => counter + parseFloat(current.price), 0)
        
        this.tag.innerHTML = total
    }
}
