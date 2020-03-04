"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keystone_1 = require("@keystonejs/keystone");
const app_graphql_1 = require("@keystonejs/app-graphql");
const app_admin_ui_1 = require("@keystonejs/app-admin-ui");
const file_adapters_1 = require("@keystonejs/file-adapters");
const oembed_adapters_1 = require("@keystonejs/oembed-adapters");
const adapter_mongoose_1 = require("@keystonejs/adapter-mongoose");
const auth_password_1 = require("@keystonejs/auth-password");
const lists_1 = __importDefault(require("./lists"));
require('dotenv').config();
const PROJECT_NAME = process.env.PROJECT_NAME;
const iframelyAdapter = new oembed_adapters_1.IframelyOEmbedAdapter({
    apiKey: process.env.IFRAMELY_KEY
});
const staticPath = 'app/public';
const staticRoute = '';
const imageFileAdapter = new file_adapters_1.LocalFileAdapter({
    src: `${staticPath}/images`,
    path: `${staticRoute}/images`
});
const keystone = new keystone_1.Keystone({
    name: PROJECT_NAME,
    adapter: new adapter_mongoose_1.MongooseAdapter({ dbName: 'keystone-db' })
});
const authStrategy = keystone.createAuthStrategy({
    type: auth_password_1.PasswordAuthStrategy,
    list: 'User',
    config: {
        identityField: 'username',
        secretField: 'password' // default: 'password'
    }
});
const createLists = () => lists_1.default(keystone, { imageFileAdapter, iframelyAdapter });
const boot = () => __awaiter(void 0, void 0, void 0, function* () {
    createLists();
    yield keystone.prepare({
        cors: { origin: true, credentials: true }
    });
});
boot();
module.exports = {
    keystone,
    apps: [
        new app_graphql_1.GraphQLApp(),
        new app_admin_ui_1.AdminUIApp({
            adminPath: '/admin',
            hooks: require.resolve('../admin/'),
            authStrategy,
            enableDefaultRoute: true
        }),
    ]
};
//# sourceMappingURL=index.js.map