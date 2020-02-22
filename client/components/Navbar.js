import React from 'react'
import Link from "next/link"

export default () => {


        return  <>

        <ul className='menu'>

        <li><Link><a href='/index'>Home</a></Link></li>
    <li><Link><a href='/posts'>Posts</a></Link></li>
    <li><Link><a href='/sendForm'>Add Article</a></Link></li>
    <li><a href='http://localhost:3000/admin'>Admin</a></li>
    </ul>
    </>
}
