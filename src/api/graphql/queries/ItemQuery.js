const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const isAuth = require('../../policies/auth.policy')
const { ItemType } = require('../types');
const { Item } = require('../../models');

const itemQuery = {
  type: new GraphQLList(ItemType),
  args: {
    page: {
      name: 'page',
      type: GraphQLInt,
    },
    limit: {
      name: 'limit',
      type: GraphQLInt,
    },
  },
  resolve: async (user, { page, limit }, context) => {

    await isAuth(user, { page, limit }, context);

    if (!page || page < 1) page = 1
    if (!limit || limit < 1) limit = 28

    return Item.findAll({
      offset: ((page - 1) * 28),
      limit: limit
    })
  },
};

module.exports = { itemQuery };
