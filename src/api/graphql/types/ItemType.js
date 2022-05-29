const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'This represents a Item',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (item) => item.id,
    },
    title: {
      type: GraphQLInt,
      resolve: (item) => item.title,
    },
    subTitle: {
      type: GraphQLString,
      resolve: (item) => item.subTitle,
    },
    image: {
      type: GraphQLString,
      resolve: (item) => item.image,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (item) => item.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (item) => item.createdAt,
    },
  }),
});

module.exports = { ItemType };
