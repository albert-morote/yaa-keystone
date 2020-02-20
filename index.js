const {Keystone} = require('@keystonejs/keystone');
const {Text, Select} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {NextApp} = require('@keystonejs/app-next')
const MySelect = require('./MySelect')

const {MongooseAdapter: Adapter} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "yaa keystone";


const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(),
});

keystone.createList('Todo', {
    schemaDoc: 'A list of things which need to be done',
    fields: {
        name: {type: Text, schemaDoc: 'This is the thing you need to do'},
        blip: {type: Text, schemaDoc: 'This is another thing'},
        status: {type: Select, options: 'pending, processed'},
        sploof: {
            type: MySelect, options: ['pending', 'processed'],

        },
    },
    hooks: {
        // Hooks for create and update operations
        resolveInput: async (params) => {
            console.log("params")
            console.log(params)

        }
    }
})
;

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({enableDefaultRoute: true}),
        new NextApp({dir: 'app'})
    ],
};
