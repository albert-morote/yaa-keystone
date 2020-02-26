import axios from "axios"

const query = `query {
            allTodos { name }
            }`


export default  async () => {
    const port = process.env.REACT_APP_PORT;
    const host = process.env.HOST

    try {
       const res = await axios({
            url: `http://localhost:${port}/admin/api`,
            method: 'post',
            data: {
                query
            },
            headers: {
                'Content-Type': 'application/json'
            }

        })
        return res?.data?.data?.allTodos?.map(todo => ({label:todo.name,value:todo.name}))

    } catch (error) {
        console.log(`error ${error.toString()}`)
    }

}


