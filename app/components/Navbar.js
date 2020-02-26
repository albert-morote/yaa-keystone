import React from 'react'
import Link from "next/link"
export default () => {
  const port = process.env.REACT_APP_PORT
const host = process.env.HOST
    return <ul className='menu'>

        <li><Link href='/index'><a  >Home</a></Link></li>
        <li><Link href='/posts'><a >Articles</a></Link></li>
        <li><Link href='/sendForm'><a  >Add Article</a></Link></li>
        <li><a href={`${host}/admin`}>Admin</a></li>
    </ul>


}


