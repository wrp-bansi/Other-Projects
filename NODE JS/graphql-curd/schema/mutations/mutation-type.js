// MutationType.js

const { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql');


const WebsiteInputType = new GraphQLInputObjectType({
    name: 'UpdateWebsiteInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        ownerId: { type: GraphQLInt },
    }),
});

const ownerInputType = new GraphQLInputObjectType({
    name: 'UpdateownerInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
    }),
});

module.exports = { WebsiteInputType, ownerInputType };
