const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const OwnerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },


    })
});

module.exports = OwnerType;
