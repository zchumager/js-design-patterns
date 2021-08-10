document.addEventListener("DOMContentLoaded", function() {
    let usersSelect = new UsersSelect(document.getElementById("users-select"))

    let titleTxt = document.getElementById("title-txt")
    let bodyTxt = document.getElementById("body-txt")
    let saveBtn = document.getElementById("save-btn")

    saveBtn.addEventListener("click", () => {
        title = titleTxt.value
        userId = usersSelect.tag[usersSelect.tag.selectedIndex].value
        body = bodyTxt.value

        let post = new PostBuilder()
            .withTitle(title)
            .withUserId(userId)
            .withBody(body)
            .build()


        // An async method return a promise that needs to be threated with then 
        PostRepository.save(post).then(response => response.json())
        .then(json => {
            alert(`Post: ${json.post.title} has ben saved with id: ${json.id}`)
        })
        .catch(error => {
            alert("could save post")
        })
    })
})
