import React from 'react';
import gql from "graphql-tag"
import useScript from '../../hooks/useScript'
const ARTICLE_QUERY = gql`
query Article ($id:ID!) {
  
   Article(where: {id:$id}) {
      title
      text
      video {
       ... on OEmbedVideo {
        html
        }
      }
      images {
        file {
          filename
        }
      }
  }
  }
`;


const Post = props => {
    useScript('https://cdn.commento.io/js/commento.js');

    const {data} = props
    const article = data?.data?.Article
    console.log("article")
    console.log(article)

    const embed = article?.video?.html && {__html: article.video.html}
    return (
        <>
            <div>
                <h1>Article</h1>


                <h1>{article?.title}</h1>
                <h3>{article?.text}</h3>
                {article?.images.map(image => <img src={`/images/${image.file.filename}`}/>)}
                {embed && <div dangerouslySetInnerHTML={embed}></div>}
            </div>
            <div id="commento"></div>
        </>
    );
};

Post.getInitialProps = async ctx => {

    console.log('post gip')
    const apolloClient = ctx.apolloClient;
    try {
        console.log('query')
        console.log(ctx.query)
        const {id} = ctx.query
        console.log('id', id)
        const data = await apolloClient.query({query: ARTICLE_QUERY, variables: {id}})
        console.log('data')
        console.log(data)
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Post;

