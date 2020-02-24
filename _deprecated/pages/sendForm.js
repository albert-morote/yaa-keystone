import React, {useState} from 'react';
import Head from 'next/head';
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

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



    return (

        <div>

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

        </div>
    );
};

export default Home;