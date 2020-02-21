import React from 'react';
import Head from 'next/head';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import apollo from "next-with-apollo/lib/apollo"

const ARTICLES_QUERY = gql`
  query {
  
   allArticles {
      title
      text
  }
  }
`;

const Home = (props) => {
    // Create a query hook
    const {data} = props
    const articles = data?.data?.allArticles

    console.log(articles)
    /*
    const {data, loading, error} =  useQuery(ARTICLES_QUERY);
*/
    /*
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {JSON.stringify(error)}</p>;
        }*/
    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <p>some paragraph stext</p>
            <div>And something in a div</div>
            <ul>
                {articles?.map(article => {
                    return <li key={`article__${article.title}`}>{article.title}</li>;
                })}
            </ul>
        </div>
    );
};


Home.getInitialProps = async ctx => {

    console.log('page gip')
    const apolloClient = ctx.apolloClient;
    // console.log('client', apolloClient)
    try {
        const data = await apolloClient.query({query:ARTICLES_QUERY})
        console.log('data')
        console.log(data)
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Home;