import React, {useState} from 'react'


export default () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    return <form>
        <label>
            Title
            <input type='text' name='title' value={title} onChange={() => setTitle(event.target.value)}/>
        </label>
        <label>
            Content
            <input type='text' name='name' value={text} onChange={() => setText(event.target.value)}/>
        </label>
        <input type='submit' value='Submit'/>
    </form>

}