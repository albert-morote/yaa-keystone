import React, {useEffect} from 'react';
import gql from "graphql-tag"

import useScript from "../../hooks/useScript"

const ARTICLE_QUERY = gql`
 query Article ($id:ID!) {
  
   Article(where: {id:$id}) {
      title
      text
     video {
      youtube {
        ... on OEmbedVideo {
          html
        }
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
    useScript('https://cdn.commento.io/js/commento.js')
    const {data} = props
    const article = data?.data?.Article
    console.log("article")
    console.log(article)

    const embeds = article?.video
    return (
        <div className='article_main'>
            <h1>Article</h1>


            <h1>{article?.title}</h1>
            {(article?.text) && <div dangerouslySetInnerHTML={{__html: article.text}}></div>}
            <div id="commento"></div>
            {article?.images.map(image => <img src={`/images/${image.file.filename}`}/>)}
            {embeds && embeds.map(embed =>
                (embed?.youtube?.html) && <div className='article_embed' dangerouslySetInnerHTML={{__html: embed.youtube.html}}></div>
            )}
        </div>
    );
};

Post.getInitialProps = async ctx => {

    console.log('post gip')
    const apolloClient = ctx.apolloClient;
    try {
        const {id} = ctx.query
        const data = await apolloClient.query({query: ARTICLE_QUERY, variables: {id}})
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        return {data: {}}
    }
}
export default Post;

