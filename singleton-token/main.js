document.addEventListener("DOMContentLoaded", function() {
    let tokenBtn = document.getElementById("token-btn")
    let tokenTxt = document.getElementById("token-txt")
    let token = Singleton.getInstance()

    tokenBtn.addEventListener("click", () => {
        tokenTxt.innerHTML = token.uuid
    })
})