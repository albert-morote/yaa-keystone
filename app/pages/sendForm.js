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

const Home = () => {
    // Create a query hook

    const onError = err => console.log('error', err)
    const onCompleted = (x) => console.log('completed', x)

    const [addProposal, {data2}] = useMutation(ADD_PROPOSAL, {onError, onCompleted});

    const [title, setTitle] = useState('')

    const [text, setText] = useState('')

    const handleEditorChange = (content) => {
        setText(content)
    }
    const handleSubmit =async event => {

        event.preventDefault();
        await  addProposal({variables: {title, text}});
        setText('')
        setTitle('')
    }



    return (

        <div className='proposal_main'>

            <p>Aliquam accumsan bibendum tempor. Sed semper efficitur pretium. Ut in risus ac nisl convallis lobortis. Aliquam at bibendum libero, a posuere sapien. Donec porttitor leo sed purus placerat mollis. Cras tellus turpis, porttitor a nunc quis, ultricies dignissim justo. Cras rutrum at tortor nec porta. Maecenas auctor neque luctus accumsan vestibulum. In urna augue, ornare interdum ullamcorper sagittis, congue a tortor. Suspendisse semper, eros a cursus blandit, eros velit malesuada urna, eget ornare felis velit ac eros. Aenean eu eros quam. Etiam quis placerat lorem, euismod porta neque. Praesent eleifend lorem sed turpis lobortis, non interdum ligula congue. Pellentesque et sem id nisi facilisis consectetur. Phasellus fermentum sem mauris, at egestas nulla facilisis vel. Nullam ultricies suscipit arcu ac posuere. </p>
            <form onSubmit={event => handleSubmit(event)}>
                <label>
                    Article Title:
                    <input type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)}/>
                </label>
                <label>
                    {/*Content*/}
                 <div className='proposal_editor'>  <Editor
                        apiKey='3sws8gk9evo7zxlboldpwxclaym8vmarblz40b40xauvcacl'
                        initialValue="<p>Please enter your article content here</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                 </div>
                    {/*<input type='text' name='name' value={text} onChange={(event) => setText(event.target.value)}/>*/}
                </label>
                <input type='submit' value='Submit'/>
            </form>

        </div>
    );
};

export default Home;