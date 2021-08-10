class UsersSelect {
    constructor(tag) {
        this.tag = tag
        this.endpoint = "https://jsonplaceholder.typicode.com/users"
        
        this.findAll()

    }

    async findAll() {
        let response = await fetch(this.endpoint)
        let json = await response.json()

        this.tag.innerHTML = ""
        json.forEach(user => {
            let option = document.createElement("option")
            option.value = user.id
            option.innerHTML = `${user.name} : ${user.email}`
            this.tag.appendChild(option)
        });
    }
}

class Post {

    setTitle(title) {
        this.title = title
    }

    setBody(body) {
        this.body = body
    }

    setUserId(userId) {
        this.userId = userId
    }
}

class PostBuilder {
    constructor() {
        this.post = new Post()
    }

    withTitle(title) {
        this.post.setTitle(title)

        return this
    }

    withBody(body) {
        this.post.setBody(body)

        return this
    }

    withUserId(userId) {
        this.post.setUserId(userId)

        return this
    }

    build() {
        return this.post
    }
}

class PostRepository {
    static endpoint = "https://jsonplaceholder.typicode.com/posts"

    static async save(post) {
        let payload = JSON.stringify(post)

        let response = await fetch(this.endpoint, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

        return response
    }
}
