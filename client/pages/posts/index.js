import React from 'react';
import Head from 'next/head';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import apollo from "next-with-apollo/lib/apollo"
import Nav from "../../components/Nav"
import Link from "next/link"

const ARTICLES_QUERY = gql`
  query {
  
   allArticles {
      title
      text
      id
  }
  }
`;

const Index = (props) => {
    // Create a query hook
    const {data} = props
    const articles = data?.data?.allArticles


    return (
        <div>

            <h1>Articles</h1>
            <ul>



                    {articles?.map(article => {
                        console.log(article)
                    return    <Link key={article.id} href="/posts/[id]" as={`/posts/${article.id}`}>
                            <li >
                                <span className={'postTitle'}>{article.title}</span>

                            </li>
                        </Link>
                    })}

            </ul>

        </div>
    );
};


Index.getInitialProps = async ctx => {

    console.log('page gip')
    const apolloClient = ctx.apolloClient;
    try {
        const data = await apolloClient.query({query: ARTICLES_QUERY})
        console.log('data')
        console.log(data)
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Index;