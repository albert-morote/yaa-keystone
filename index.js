const {Keystone} = require('@keystonejs/keystone');
const {Text, Select, Relationship, File} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {NextApp} = require('@keystonejs/app-next')
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { StaticApp } = require('@keystonejs/app-static');

const {Content} = require('@keystonejs/field-content');
const Stars = require('./Stars')
const {Wysiwyg} = require('@keystonejs/fields-wysiwyg-tinymce');
const mongoose = require('mongoose')
const {MongooseAdapter: Adapter} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "yaa keystone";

const staticPath = 'client/public';
const staticRoute = '';

const imageFileAdapter = new LocalFileAdapter({
    src: `${staticPath}/images`,
    path: `${staticRoute}/images`,
});

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(),
});


keystone.createList('Article', {
    schemaDoc: 'Published Articles',
    fields: {
        title: {type: Text, schemaDoc: 'Title for published article'},
        status: {type: Select, options: 'Visible,Hidden', defaultValue: 'Hidden'},
        text: {type: Wysiwyg},
        images: {type:Relationship,ref:'Image',many:true},
        proposal: {
            isUnique: true,
            type: Relationship,
            ref: 'Proposal',
            access: {
                create: true,
                read: false,
                update: false,
            },
        },
    },

})

keystone.createList('Proposal', {
    schemaDoc: 'Proposed Content',
    fields: {
        title: {type: Text, schemaDoc: 'Title for submitted article'},
        text: {type: Wysiwyg},

        status: {type: Select, options: ['Pending', 'Approved'], defaultValue: 'Pending'},

    },
    hooks: {
        // Hooks for create and update operations
        resolveInput: async (params) => {
            const resolvedData = params.resolvedData
            const existingItem = params.existingItem
            console.log('entering')
            console.log(existingItem, resolvedData)
            if (existingItem && resolvedData && resolvedData.status && resolvedData.status.toLowerCase() === 'approved') {
                const articlesAdapter = keystone.lists.Article.adapter
                const id = mongoose.Types.ObjectId(existingItem.id);
                const existing = await articlesAdapter.findOne({proposal: id})
                console.log('existing')
                console.log(existing)
                if (!existing)
                    await articlesAdapter.create({
                        title: existingItem.title,
                        text: existingItem.text,
                        status: 'Hidden',
                        proposal: id
                    })
            }
            return params.resolvedData
        }
    }
})

keystone.createList('Image', {
    schemaDoc: 'Image for Article',
    fields: {
        file: { type: File, adapter: imageFileAdapter },


    }


})

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({enableDefaultRoute: true}),
        new NextApp({dir: 'client'}),
        new StaticApp({
            path: '/',
            src: 'static_files',
            fallback: 'index.html',
        }),
    ],
};
