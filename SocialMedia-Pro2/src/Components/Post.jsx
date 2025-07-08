import React, { useContext } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { PostList } from '../Storage/PostList-store';

function Post({post}) {
  const{deletePost} = useContext(PostList)
  return (
    <div className="card post-card post-container" style={{width: "25rem"}}>
    <div className="card-body">
      <h5 className="card-title">{post.title}
      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
      onClick={()=>deletePost(post.id)} ><AiFillDelete /></span>
      </h5>
      <p className="card-text">{post.body}</p>
      {post.tags.map((tag, index) =>
      <span key={index} className='badge text-bg-primary hastag'>{tag}</span>
        )}
      <div className="alert alert-success reaction" role="alert">
    This Post has been reacted by {post.reactions.like} people.
</div> 
    </div>
  </div>
  )
}

export default Post