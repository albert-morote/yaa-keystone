import React, {useState} from 'react';
import Head from 'next/head';
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ARTICLES_QUERY = gql`
  query {
  
   allArticles {
      title
      text
  }
  }
`;
const ADD_PROPOSAL = gql`
  mutation CreateProposal($title:String,$text:String) {
    createProposal(data:{title:$title,text:$text}) {
      title
      text
      id
    }
  }
`;

const Home = () => {
    // Create a query hook
    const {data, loading, error} = useQuery(ARTICLES_QUERY);


    const onError = err => console.log('error', err)
    const onCompleted = (x) => console.log('completed', x)

    const [addProposal, {data2}] = useMutation(ADD_PROPOSAL, {onError, onCompleted});

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleSubmit =async event => {

        event.preventDefault();
        await  addProposal({variables: {title, text}});
        setText('')
        setTitle('')
    }
    console.log(data)
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }
    return (

        <div>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <p>This is some text for you</p>
            <form onSubmit={event => handleSubmit(event)}>
                <label>
                    Title
                    <input type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)}/>
                </label>
                <label>
                    Content
                    <input type='text' name='name' value={text} onChange={(event) => setText(event.target.value)}/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
            <ul>
                {data?.allArticles?.map(article => {
                    return <li key={`article__${article.title}`}>{article.title}</li>;
                })}
            </ul>
        </div>
    );
};

export default Home;