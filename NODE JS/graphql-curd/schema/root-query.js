//rootQuery.js

const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLNonNull } = require("graphql");
const WebsiteType = require('./typeDef/website-type');
const OwnerType = require("./typeDef/owner-type");
const {WebsiteQuery, WebsiteByIdQuery, WebsiteByUpdateQuery, createWebsite, deleteWebsite}=require('./queries/website')
const {OwnerQuery, OwnerByIdQuery,ownerUpdate}=require('./queries/owner');
const { WebsiteInputType, ownerInputType } = require("./mutations/mutation-type"); // Import both input types



const RootQuery = new GraphQLObjectType({
    name: "Query",
   fields: {
        websites: {
            type: new GraphQLList(WebsiteType),
            args: {
                id: { type: GraphQLInt }
            },
            resolve: () => WebsiteQuery()
        },
        website: {
            type: WebsiteType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => WebsiteByIdQuery(parent, args)
        },

        owners: {
            type: new GraphQLList(OwnerType),
            resolve: () => OwnerQuery()
        },
        owner: {
            type: OwnerType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => OwnerByIdQuery(parent, args)
        },
    }
});


const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createWebsite: {
            type: WebsiteType,
            args: {
                input: { type: new GraphQLNonNull(WebsiteInputType) }
            },
            resolve: createWebsite
        },
        WebsiteByUpdateQuery: {
            type: WebsiteType,
            args: {
                input: { type: new GraphQLNonNull(WebsiteInputType) }
            },
            resolve: (_, { input }) => WebsiteByUpdateQuery(input)
        },
        deleteWebsite: {
            type: WebsiteType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, { id }) => deleteWebsite(null, { id })
        },
        ownerUpdate:{
            type:OwnerType,
            args:{
                input:{type:new GraphQLNonNull(ownerInputType)}
            },
            resolve: (_, { input }) => ownerUpdate(input)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});