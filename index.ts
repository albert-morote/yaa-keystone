import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { AdminUIApp } from '@keystonejs/app-admin-ui';
import { NextApp } from '@keystonejs/app-next';
import { LocalFileAdapter } from '@keystonejs/file-adapters';
import { IframelyOEmbedAdapter } from '@keystonejs/oembed-adapters';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';

import lists from './lists';

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
			hooks: require.resolve('../admin/'),
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
