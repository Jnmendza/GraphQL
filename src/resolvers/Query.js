const Query = {
    users(parent, args, { db }, info) {
        if (!args.query){
            return db.users
        } 
        
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

            return isTitleMatch || isBodyMatch
        })
    },
    comments(parent, args, { bd }, info) {
        return db.comments
    },
    me() {
        return{
            id: '123098',
            name: 'Jon',
            email: 'jon@test.com',
            age: 33
        }
    },
    post(parent, args, ctx, info) {
        return {
            id: "123098",
            title: "Title",
            body: "Some Body",
            published: true
        }
    }
}

export { Query as default }