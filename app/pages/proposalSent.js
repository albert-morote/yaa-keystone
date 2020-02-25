import React, {useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
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

const ProposalSent = () => {
    // Create a query hook

    const onError = err => console.log('error', err)
    const onCompleted = (x) => console.log('completed', x)

    const [addProposal, {data2}] = useMutation(ADD_PROPOSAL, {onError, onCompleted});

    const [title, setTitle] = useState('')

    const [text, setText] = useState('')

    const handleEditorChange = (content) => {
        setText(content)
    }
    const handleSubmit = async event => {

        event.preventDefault();
        await addProposal({variables: {title, text}});
        setText('')
        setTitle('')
    }


    return (

        <div className='proposal_main'>
            <h1>Article Proposal Sent</h1>
            <h3>Thanks for submitting the article! </h3>

        </div>
    );
};

export default ProposalSent;