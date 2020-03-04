const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { IframelyOEmbedAdapter } = require('@keystonejs/oembed-adapters');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const lists = require('./lists');

require('dotenv').config();


const PROJECT_NAME = process.env.PROJECT_NAME;


const iframelyAdapter = new IframelyOEmbedAdapter({
	apiKey: process.env.IFRAMELY_KEY
});

const staticPath = 'app/public';
const staticRoute = '';
const imageFileAdapter = new LocalFileAdapter({
	src: `${staticPath}/images`,
	path: `${staticRoute}/images`
});

const keystone = new Keystone({
	name: PROJECT_NAME,
	adapter: new MongooseAdapter({ dbName: 'keystone-db' })

});


const authStrategy = keystone.createAuthStrategy({
	type: PasswordAuthStrategy,
	list: 'User',
	config: {
		identityField: 'username', // default: 'email'
		secretField: 'password' // default: 'password'
	}
});

const createLists = () => lists(keystone, { imageFileAdapter, iframelyAdapter });

const boot = async () => {
	createLists();
	await keystone.prepare({
		cors: { origin: true, credentials: true }
	});
};

boot();


module.exports = {
	keystone,
	apps: [
		new GraphQLApp(),
		new AdminUIApp({
			adminPath: '/admin',
			hooks: require.resolve('./admin/'),
			authStrategy,
			enableDefaultRoute: true
		}),
		// new NextApp({ dir: 'app' })
		/*  new StaticApp({
					path: '/',
					src: 'static_files',
					fallback: 'index.html',
			}),*/
	]
};
