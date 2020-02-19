const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { NextApp } = require('@keystonejs/app-next');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { Text, Select } = require('@keystonejs/fields');

const PROJECT_NAME = "keystone blank";


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});
keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
    blip: { type: Text, schemaDoc: 'This is another thing' },
    status: { type: Select, options: 'pending, processed' },

  },
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(),new NextApp({dir:'app'}), new AdminUIApp({ enableDefaultRoute: true })],
};
