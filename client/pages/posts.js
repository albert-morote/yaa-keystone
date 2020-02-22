import React from 'react';
import Head from 'next/head';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import apollo from "next-with-apollo/lib/apollo"
import Nav from "../components/Nav"
const ARTICLES_QUERY = gql`
  query {
  
   allArticles {
      title
      text
  }
  }
`;

const Posts = (props) => {
    // Create a query hook
    const {data} = props
    const articles = data?.data?.allArticles


    return (
        <div>

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


Posts.getInitialProps = async ctx => {

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
export default Posts;