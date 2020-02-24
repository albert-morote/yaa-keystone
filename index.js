const {Keystone} = require('@keystonejs/keystone');
const {Text, Checkbox, Password, Select, Relationship, File} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {NextApp} = require('@keystonejs/app-next')
const {LocalFileAdapter} = require('@keystonejs/file-adapters');
const {StaticApp} = require('@keystonejs/app-static');
const {OEmbed} = require('@keystonejs/fields');
const {IframelyOEmbedAdapter} = require('@keystonejs/oembed-adapters');
const {MongooseAdapter} = require('@keystonejs/adapter-mongoose');
const sanitizeHTML = require('sanitize-html')
const {Content} = require('@keystonejs/field-content');
const Stars = require('./Stars')
const {Wysiwyg} = require('@keystonejs/fields-wysiwyg-tinymce');
const mongoose = require('mongoose')
const {MongooseAdapter: Adapter} = require('@keystonejs/adapter-mongoose');
const {PasswordAuthStrategy} = require('@keystonejs/auth-password');
const emptyObj = require('./util/emptyObject')

const PROJECT_NAME = "yaa keystone";

const staticPath = 'client/public';
const staticRoute = '';

const iframelyAdapter = new IframelyOEmbedAdapter({
    apiKey: '4fdabd9de9cc2032652043'
});


const imageFileAdapter = new LocalFileAdapter({
    src: `${staticPath}/images`,
    path: `${staticRoute}/images`,
});


const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter({dbName: 'keystone-db'}),
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
    config: {
        identityField: 'username', // default: 'email'
        secretField: 'password', // default: 'password'
    },
});


keystone.createList('User', {
    access: {
        // 1. Only admins can read deactivated user accounts
        read: ({authentication: {item}}) => {
            /* console.log('list access User')
             console.log(item)*/
            if (item.isAdmin) {
                return {}; // Don't filter any items for admins
            }
            // Approximately; users.filter(user => user.state !== 'deactivated');
            return {
                state_not: 'deactivated',
            };
        },
    }, fields: {
        username: {type: Text},
        password: {
            type: Password,
            access: {
                // 3. Only admins can see if a password is set. No-one can read their own or other user's passwords.
                read: ({authentication}) => {
                    /*      console.log('field access User password READ')

                          console.log(authentication)*/
                    return authentication.item.isAdmin
                },
                // 4. Only authenticated users can update their own password. Admins can update anyone's password.
                update: ({existingItem, authentication}) => {
                    /*     console.log('field access User password UPDATE')

                         console.log(existingItem, authentication)*/
                    return authentication.item.isAdmin
                        || existingItem.id === authentication.item.id
                },
            }
        },
        isAdmin: {
            type: Checkbox
        }
        /* read: ({authentication}) => {

                   console.log('field access User isAdmin READ')

          console.log(authentication.item.isAdmin)
             return authentication.item.isAdmin},
         update: ({authentication}) => {

             console.log('field access User isAdmin UPDATE')

             console.log(authentication.item.isAdmin)
             return authentication.item.isAdmin},        }
 }*/
    }
});

keystone.createList('YouTube', {
    schemaDoc: 'YouTube embeds',
    fields: {
        youtube: {type: OEmbed, adapter: iframelyAdapter},
    }

})


keystone.createList('Article', {
    schemaDoc: 'Published Articles',
    access: {
        // 1. Only admins can read deactivated user accounts

        create: ({authentication}) => (!emptyObj(authentication) && authentication.item && authentication.item.isAdmin),
        update: ({authentication}) => !emptyObj(authentication) && authentication.item && authentication.item.isAdmin,
        delete: ({authentication}) => !emptyObj(authentication) && authentication.item && authentication.item.isAdmin
    },
    fields: {
        title: {type: Text, schemaDoc: 'Title for published article'},
        status: {type: Select, options: 'Visible,Hidden', defaultValue: 'Hidden'},
        text: {type: Wysiwyg},
        images: {type: Relationship, ref: 'Image', many: true},
        video: {type: Relationship, ref: 'YouTube', many: true},
        proposal: {
            isUnique: false,
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
            if (existingItem && resolvedData && resolvedData.status && resolvedData.status.toLowerCase() === 'approved') {
                const articlesAdapter = keystone.lists.Article.adapter
                const id = mongoose.Types.ObjectId(existingItem.id);
                const existing = await articlesAdapter.findOne({proposal: id})
                const cleanText = sanitizeHTML(existingItem.text)
                const cleanTitle = sanitizeHTML(existingItem.title)
                if (!existing)

                    await articlesAdapter.create({
                        title: cleanTitle,
                        text: cleanText,
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
        file: {type: File, adapter: imageFileAdapter},


    }


})

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({authStrategy, enableDefaultRoute: true}),
        new NextApp({dir: 'client'}),
        new StaticApp({
            path: '/',
            src: 'static_files',
            fallback: 'index.html',
        }),
    ],
};
