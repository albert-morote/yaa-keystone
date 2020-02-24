import React from 'react';
import App from 'next/app';
import {ApolloProvider} from '@apollo/react-hooks';

import withApollo from '../util/apollo-client';
// import 'normalize.css'
import '../styles/main.scss'

function MyApp({Component, pageProps, apollo}) {
    return <ApolloProvider client={apollo}>

        <Component {...pageProps} />
    </ApolloProvider>

}

/*
Only uncomment this method if you have blocking data requirements for
every single page in your application. This disables the ability to
perform automatic static optimization, causing every page in your app to
be server-side rendered.
*/

MyApp.getInitialProps = async (appContext) => {
    console.log('app gip')
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return {...appProps}
}

export default withApollo(MyApp)

