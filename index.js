const {Keystone} = require('@keystonejs/keystone');
const {Text, Select} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {NextApp} = require('@keystonejs/app-next')
const {Content} = require('@keystonejs/field-content');
const Stars = require('./Stars')
const {Wysiwyg} = require('@keystonejs/fields-wysiwyg-tinymce');

const {MongooseAdapter: Adapter} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "yaa keystone";


const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(),
});



keystone.createList('Article', {
    schemaDoc: 'Published Articles',
    fields: {
        title: {type: Text, schemaDoc: 'Title for published article'},
        status: {type: Select, options: 'Visible,Hidden'},
        text: {type: Wysiwyg}
    },
    proposal: {
        type: String,
        access: {
            create: false,
            read: true,
            update: false,
        },
    },
})

keystone.createList('Proposal', {
    schemaDoc: 'Proposed Content',
    fields: {
        title: {type: Text, schemaDoc: 'Title for submitted article'},
        text: {type: Wysiwyg},

        status: {type: Select, options: ['Pending','Approved']}
    },
    hooks: {
        // Hooks for create and update operations
        resolveInput: async (params) => {
           /* console.log("params")
            console.log(params)*/
            const data = await keystone.lists.Article.adapter.create({title:"fromOutside",text:"Myfriend"})
            console.log(data)
            return params.resolvedData
        }
    }
})

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({enableDefaultRoute: true}),
         new NextApp({dir: 'app'})
    ],
};
