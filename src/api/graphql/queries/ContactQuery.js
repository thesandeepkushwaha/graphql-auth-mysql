const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const isAuth = require('../../policies/auth.policy')

const { ContactType } = require('../types');
const { Contact } = require('../../models');

const contactQuery = {
  type: new GraphQLList(ContactType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    firstName: {
      name: 'firstName',
      type: GraphQLString,
    },
    lastName: {
      name: 'lastName',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    phone: {
      name: 'phone',
      type: GraphQLInt,
    },
    message: {
      name: 'message',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (user, args, context) => {
    await isAuth(user, args, context);
    return Contact.findAll()
  },
};

module.exports = { contactQuery };
