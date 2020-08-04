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


const typeDefs = `
    type Query {
        users(query: String): [User!]!
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
        me() {
            return{
                id: '123098',
                name: 'Jon',
                email: 'jon@test.com',
                age: 33
            }
        },
        post() {
            return{
                id: '321098',
                title: 'New Title of Book',
                body: 'New body text',
                published: true
            }
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