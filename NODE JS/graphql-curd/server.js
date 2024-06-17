//server.js

const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const app=express()
const schema = require('./schema/root-query');


app.use(express.json());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});