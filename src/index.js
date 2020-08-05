import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float(with decimals), ID

// Demo user data
const users = [{
    id: '1',
    name: "Jonathan",
    email: "jon@example.com",
    age: 33
}, {
    id: '2',
    name: "Steve",
    email: "steve@example.com",
}, {
    id: '3',
    name: "ed",
    email: "ed@example.com",
    age: 33
}]

// Demo Posts data
const posts = [{
    id: '321',
    title: 'GraphQl',
    body: 'GraphQL body goes here',
    published: true,
    author: '1',
    comment: '098'
},
{
    id: '322',
    title: 'Fundamentals',
    body: 'This is the body for fundamentals',
    published: false,
    author: '1',
    comment: '096'
},
{
    id: '323',
    title: 'Basics',
    body: 'This is the body for basics',
    published: true,
    author: '2',
    comment: '094'
},]

const comments = [{
    id: '098',
    text: 'I loved the course keep up the good work!',
    author: '2',
    post: '323'
},
{
    id: '096',
    text: 'Some other comments you have been waiting for',
    author: '3',
    post: '321'
},
{
    id: '094',
    text: 'More comments because why not',
    author: '1',
    post: '322'
},
{
    id: '092',
    text: 'Essential comments goes here',
    author: '2',
    post: '322'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query){
                return users
            } 
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args, ctx, info) {
            return comments
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
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx ,info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up")
})