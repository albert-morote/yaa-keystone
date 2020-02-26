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
    podcast {
      spotify {
        ... on OEmbedRich {
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

    const videos = article?.video
    const podcasts = article?.podcast
    return (
        <div className='article_main'>
            <div className='article_content'>
                <div className='article_content_text'>
                    <h1>{article?.title}</h1>

                    {(article?.text) && <div dangerouslySetInnerHTML={{__html: article.text}}></div>}
                 <h3 className='article_content_comments'>Comments</h3>

                    <div id="commento"></div>

                </div>
                <div className='article_content_media'>
                    {article?.images.map(image => <img src={`/images/${image.file.filename}`}/>)}
                    {videos && <h3>Videos</h3>}
                    {videos?.map(video =>
                        (video?.youtube?.html) &&
                        <div className='article_embed' dangerouslySetInnerHTML={{__html: video.youtube.html}}></div>
                    )}
                    {videos && <h3>Podcasts</h3>}

                    {podcasts?.map(podcast => {
                            return (podcast?.spotify?.html) &&
                                <div className='article_embed'
                                     dangerouslySetInnerHTML={{__html: podcast.spotify.html}}></div>
                        }
                    )}
                </div>

            </div>

        </div>
    );
};

Post.getInitialProps = async ctx => {

    const apolloClient = ctx.apolloClient;
    try {
        const {id} = ctx.query
        const data = await apolloClient.query({query: ARTICLE_QUERY, variables: {id}})
        return {data}
    } catch (error) {
        console.log(`error ${error.toString()}`)
        console.log(error)
        return {data: {}}
    }
}
export default Post;

