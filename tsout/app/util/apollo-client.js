"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("apollo-client");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const next_with_apollo_1 = __importDefault(require("next-with-apollo"));
const apollo_link_http_1 = require("apollo-link-http");
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
// Update the GraphQL endpoint to any instance of GraphQL that you like
const port = process.env.REACT_APP_PORT;
const host = process.env.HOST;
console.log('port', port);
// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `${host}/admin/api`;
const link = apollo_link_http_1.createHttpLink({
    fetch: isomorphic_unfetch_1.default,
    uri: GRAPHQL_URL
});
// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
exports.default = next_with_apollo_1.default(
// You can get headers and ctx (context) from the callback params
// e.g. ({ headers, ctx, initialState })
({ ctx, initialState }) => new apollo_client_1.ApolloClient({
    link: link,
    ssrMode: !!ctx,
    cache: new apollo_cache_inmemory_1.InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {}),
}));
//# sourceMappingURL=apollo-client.js.map