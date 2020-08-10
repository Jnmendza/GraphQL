import {uuid} from 'uuidv4'


const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => {
            return user.email === args.data.email
        })

        if (emailTaken) {
            throw new Error('Email taken.')
        }
        
        const user = {
            id: uuid(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error("user not found")
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers
    },
    updateUser(parent, args , { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error("User not found")
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error("Email taken")
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },
    createPost(parent, args, { db }, info) {
        // make sure the author id given matches the id for one of the users
        const userExist = db.users.some((user) => {
            return user.id === args.posts.author
        })

        if (!userExist) {
            throw new Error("User not found")
        }

        const post = {
            id: uuid(),
            ...args.posts
        }

        db.posts.push(post)

        return post

    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => post.id ===args.id)

        if(postIndex === -1) {
            throw new Error("Post does not Exist")
        }

        const deletedPosts = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        return deletedPosts[0]

    },
    createComment(parent, args, { db }, info) {
        const userExist = db.users.some((user) => {
            return user.id === args.comments.author
        })

        const postExist = db.posts.some((post) => {
            return post.id === args.comments.post && post.published
        })

        if(!userExist || !postExist) {
            throw new Error('Post and user not found')
        }

        const comment = {
            id: uuid(),
            ...args.comments
        }

        db.comments.push(comment)

        return comment
    },
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if(commentIndex === -1) {
            throw new Error("Comment does not exist")
        }

        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    }
}

export { Mutation as default }