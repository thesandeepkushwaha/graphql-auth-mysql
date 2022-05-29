const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const isAuth = require('../../policies/auth.policy')

const { ContactType } = require('../types');
const { Contact } = require('../../models');

const createContact = {
  type: ContactType,
  description: 'The mutation that allows you to create a new Note',
  args: {
    firstName: {
      name: 'firstName',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      name: 'lastName',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      name: 'phone',
      type: new GraphQLNonNull(GraphQLInt),
    },
    message: {
      name: 'message',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (value, { firstName, lastName, email, phone, message }, context) => {

    await isAuth({}, {}, context);
    Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message
    })
  },
};

const updateContact = {
  type: ContactType,
  description: 'The mutation that allows you to update an existing Contact by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    firstName: {
      name: 'firstName',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      name: 'lastName',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      name: 'phone',
      type: new GraphQLNonNull(GraphQLInt),
    },
    message: {
      name: 'message',
      type: GraphQLString,
    },
  },
  resolve: async (value, { id, firstName, lastName, email, phone, message }, context) => {
    await isAuth({}, {}, context);
    const foundContact = await Contact.findByPk(id);

    if (!foundContact) {
      throw new Error(`Contact with id: ${id} not found!`);
    }

    const updatedContact = merge(foundContact, {
      id,
      firstName,
      lastName,
      email,
      phone,
      message
    });

    return foundContact.update(updatedContact);
  },
};

const deleteContact = {
  type: ContactType,
  description: 'The mutation that allows you to delete a existing Contact by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, { id }, context) => {
    await isAuth({}, {}, context);
    const foundContact = await Note.findByPk(id);

    if (!foundContact) {
      throw new Error(`Contact with id: ${id} not found!`);
    }

    await Contact.destroy({
      where: {
        id,
      },
    });

    return foundContact;
  },
};

module.exports = {
  createContact,
  updateContact,
  deleteContact
};
