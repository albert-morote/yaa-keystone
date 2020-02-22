import React from 'react';
import gql from "graphql-tag"


const ARTICLE_QUERY = gql`
 query Article ($id:ID!) {
  
   Article(where: {id:$id}) {
      title
      text
      images {
        file {
          filename
        }
      }
  }
  }
`;

const Post = props => {

    const {data} = props
    console.log("data")
    const article = data?.data?.Article

    return (
        <div >
            <h1>Article</h1>


            <h1>{article?.title}</h1>
            <h3>{article?.text}</h3>
            <div id="commento"></div>
            {article?.images.map(image=> <img src={`/images/${image.file.filename}`}/>)}
        </div>
    );
};

Post.getInitialProps = async ctx => {

    console.log('post gip')
    const apolloClient = ctx.apolloClient;
    try {
        console.log('query')
        console.log(ctx.query)
        const {id} = ctx.query
        console.log('id',id)
        const data = await apolloClient.query({query: ARTICLE_QUERY, variables:{id}})
        console.log('data')
        console.log(data)
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Post;

