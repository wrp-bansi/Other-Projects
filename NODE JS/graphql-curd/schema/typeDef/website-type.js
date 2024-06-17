// WebsiteType.js

const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const WebsiteType = new GraphQLObjectType({
    name: "Website",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        ownerId: { type: GraphQLInt },

    })
});

module.exports = WebsiteType;
