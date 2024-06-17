const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { User } = require('./models');
const {Quties}=require('./models')

const typeDefs = `
  type User {
    id:ID!
    name: String
    email: String
    phone: String
    quties: [Quties]

  }

  type Quties {
    id: ID!
    name: String
    userId: ID
  }

  type Query {
    users: [User]
    quties:[Quties]
    user(id:ID!):User
  }
`;

const resolvers = {
  Query: {
    users: () => User.findAll(),
    quties:()=>Quties.findAll(),
    user: (_, { id }) => User.findByPk(id)
  },
  User:{
    quties:(user)=>Quties.findAll({ where: { userId: user.id } })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});



const { url } =  startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
