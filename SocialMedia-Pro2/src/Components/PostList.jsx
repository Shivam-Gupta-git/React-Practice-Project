import React, { useContext } from 'react'
import Post from './Post'
import { PostList as PostListData } from '../Storage/PostList-store'
import WelcomeMessage from './WelcomeMessage'
import LoadingSpiner from './LoadingSpiner'

function PostList() {
  const{postList, fetching} = useContext(PostListData)
  
  return (
    <>
    {
      fetching && <LoadingSpiner/>
    }
    {
     !fetching && postList.length === 0 && <WelcomeMessage/>
    }
    {!fetching && postList.map((post)=>(
      <Post key={post.id} post = {post}></Post>
    ))}
    </>
  )
}

export default PostList;