const users = [{
    id: '1',
    name: "Jonathan",
    email: "jon@example.com",
    age: 33
}, {
    id: '2',
    name: "Steve",
    email: "steve@example.com",
    age: 24
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

const db = {
    users,
    posts,
    comments
}

export { db as default }