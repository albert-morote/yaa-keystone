import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const port = process.env.REACT_APP_PORT;
console.log('port',port)
// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `http://localhost:${port}/admin/api`;

const link = createHttpLink({
    fetch, // Switches between unfetch & node-fetch for client & server.
    uri: GRAPHQL_URL
});



// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
    // You can get headers and ctx (context) from the callback params
    // e.g. ({ headers, ctx, initialState })
    ({ ctx, initialState }) =>
        new ApolloClient({
            link: link,
            ssrMode:!!ctx,
            cache: new InMemoryCache()
                //  rehydrate the cache using the initial data passed from the server:
                .restore(initialState || {}),

        })
);