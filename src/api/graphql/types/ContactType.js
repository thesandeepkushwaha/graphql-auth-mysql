const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'This represents a Contact',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (contact) => contact.id,
    },
    firstName: {
      type: GraphQLInt,
      resolve: (contact) => contact.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (contact) => contact.lastName,
    },
    email: {
      type: GraphQLString,
      resolve: (contact) => contact.email,
    },
    phone: {
      type: GraphQLString,
      resolve: (contact) => contact.phone,
    },
    message: {
      type: GraphQLString,
      resolve: (contact) => contact.message,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (contact) => contact.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (contact) => contact.createdAt,
    },
  }),
});

module.exports = { ContactType };
