const {Keystone} = require('@keystonejs/keystone');
const {MongooseAdapter: Adapter} = require('@keystonejs/adapter-mongoose');
const {Text, Select, Unsplash, CalendarDay, File} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {StaticApp} = require('@keystonejs/app-static');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {NextApp} = require('@keystonejs/app-next')
const {Content} = require('@keystonejs/field-content');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { atTracking } = require('@keystonejs/list-plugins');

const getYear = require('date-fns/get_year');

const Stars = require('./Stars')
const MySelect = require('./MySelect')


const PROJECT_NAME = "yaa keystone";

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(),
});

const staticPath = 'public';
const staticRoute = '';

const avatarFileAdapter = new LocalFileAdapter({
    src: `${staticPath}/avatars`,
    path: `${staticRoute}/avatars`,
  });

keystone.createList('Todo', {
    schemaDoc: 'A list of things which need to be done',
    fields: {
        name: {type: Text, schemaDoc: 'This is the thing you need to do'},
        blip: {type: Text, schemaDoc: 'This is another thing'},
        status: {type: Select, options: 'pending, processed'},
        mySelectField: {type: MySelect, options: 'pending, processed,first todo'},
        rating: { type: Stars, starCount: 5 },
        // image: { type: Unsplash, ...unsplashOptions },
        dob: {
            type: CalendarDay,
            format: 'Do MMMM YYYY',
            yearRangeFrom: 1982,
            yearRangeTo: getYear(new Date()),
        },
        avatar: { type: File, adapter: avatarFileAdapter },

        /* body: {
            type: Content,
            blocks: [
                Content.blocks.blockquote,
                Content.blocks.image,
                Content.blocks.link,
                Content.blocks.orderedList,
                Content.blocks.unorderedList,
                Content.blocks.heading,
                // CloudinaryImage.blocks.image,
            ],
        },*/
    },
    hooks: {
        // Hooks for create and update operations
        resolveInput: async (params) => {
            console.log("params")
            console.log(params)
            return params.resolvedData
        }
    }
})

keystone.createList('ListWithPlugin', {
    fields: {
      name: { type: Text }
    },
    plugins: [
      atTracking({
        /* ...config */
      }),
    ],
  });

const adminApp = new AdminUIApp({
    adminPath: '/admin',
    enableDefaultRoute: true,
    hooks: require.resolve('./admin/'),
    // authStrategy,
    // isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
  });
  

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new StaticApp({ path: '/', src: 'public' }),
        new StaticApp({path:'/resources', src:'static'}),
        // new AdminUIApp({enableDefaultRoute: true}),
        adminApp,
        new NextApp({dir: 'app'})
    ],
};
