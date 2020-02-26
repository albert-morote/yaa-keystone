import React from 'react';
import Head from 'next/head';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import apollo from "next-with-apollo/lib/apollo"

const Home = (props) => {
    // Create a query hook
    const {data} = props
    const articles = data?.data?.allArticles


    return (
        <div className='home_main'>
            <h1>Youth Against Aids</h1>
            <p>Aliquam accumsan bibendum tempor. Sed semper efficitur pretium. Ut in risus ac nisl convallis lobortis. Aliquam at bibendum libero, a posuere sapien. Donec porttitor leo sed purus placerat mollis. Cras tellus turpis, porttitor a nunc quis, ultricies dignissim justo. Cras rutrum at tortor nec porta. Maecenas auctor neque luctus accumsan vestibulum. In urna augue, ornare interdum ullamcorper sagittis, congue a tortor. Suspendisse semper, eros a cursus blandit, eros velit malesuada urna, eget ornare felis velit ac eros. Aenean eu eros quam. Etiam quis placerat lorem, euismod porta neque. Praesent eleifend lorem sed turpis lobortis, non interdum ligula congue. Pellentesque et sem id nisi facilisis consectetur. Phasellus fermentum sem mauris, at egestas nulla facilisis vel. Nullam ultricies suscipit arcu ac posuere. </p>

        </div>
    );
};


Home.getInitialProps = async ctx => {

    console.log('page gip')
    const apolloClient = ctx.apolloClient;
    // console.log('client', apolloClient)
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
export default Home;