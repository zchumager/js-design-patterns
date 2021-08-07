document.addEventListener("DOMContentLoaded", function() {
    let articleTxt = document.getElementById("article-txt")
    let priceTxt = document.getElementById("price-txt")
    let addBtn = document.getElementById("add-btn")

    let purchase = new Purchase()
    let itemList = new ItemsList(document.getElementById("items-list"))
    let priceCounter = new PriceCounter(document.getElementById("total-txt"))
    
    purchase.attach(itemList)
    purchase.attach(priceCounter)

    addBtn.addEventListener("click", () => {
        item = {
            'article': articleTxt.value,
            'price': priceTxt.value
        }

        purchase.addItem(item)
    })
})