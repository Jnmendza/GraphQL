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
    author: '1'
},
{
    id: '322',
    title: 'Fundamentals',
    body: 'This is the body for fundamentals',
    published: false,
    author: '1'
},
{
    id: '323',
    title: 'Basics',
    body: 'This is the body for basics',
    published: true,
    author: '2'
},]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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