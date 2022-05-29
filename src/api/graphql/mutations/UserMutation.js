const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql');

const authService = require('../../services/auth.service');
const bcryptService = require('../../services/bcrypt.service');

const { User } = require('../../models');

const UserType = new GraphQLObjectType({
  name: "Token",
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});

const login = {
  type: UserType,
  description: 'The mutation that allows you to Generate JWT token',
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (value, { email, password }) => {

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('User not found')
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return { token, id: user.id, email: user.email };
        }

        throw new Error('Unauthorized')
      } catch (err) {
        throw new Error(err)
      }
    }
    throw new Error('Email and password don\'t match')
  }
};

module.exports = {
  login,
};
