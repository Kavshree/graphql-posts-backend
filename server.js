var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

const schema = buildSchema(`
    type Comment {
        id: Int!,
        postId: Int!,
        body: String,
    }
    type Post {
        userId: Int!,
        id: Int!,
        title: String,
        body: String
    }
    type Query {
        posts: [Post],
        comments(postId: Int!): [Comment]
    }
`)

const value = {
    posts: () => {
        return [{
                userId: 1,
                id: 9,
                title: "nesciunt iure omnis dolorem tempora et accusantium",
                body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
              },
              {
                userId: 1,
                id: 10,
                title: "optio molestias id quia eum",
                body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
              }]
    },
    comments: ({postId}) => {
        let posts = [
            {body: "MongoDB", postId: 1}, 
            {body: "Express", postId: 1}, 
            {body: "GraphQL", postId: 2}, 
            {body: "Fancy Tech Stack!", postId: 3}
        ]
        return posts.filter(p => p.postId === postId)
    }
}
var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: value,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")