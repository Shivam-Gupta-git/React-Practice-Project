import React, { useContext, useRef } from 'react'
import { PostList } from '../Storage/PostList-store';
import { useNavigate } from 'react-router-dom';
import LoadingSpiner from './LoadingSpiner';

function CreatePost() {

  const{addPost, fetching} = useContext(PostList)
   const navigate = useNavigate()

  const userIdElement = useRef()
  const titleElement = useRef();
  const bodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handelOnSubmitButton = (event)=>{
   event.preventDefault();
   const userId = userIdElement.current.value;
   const title = titleElement.current.value;
   const body = bodyElement.current.value;
   const reactions = reactionsElement.current.value;
   const tags = tagsElement.current.value.split(" ");

   userIdElement.current.value = ' '
   titleElement.current.value = ' '
   bodyElement.current.value = ' '
   reactionsElement.current.value = ' '
   tagsElement.current.value = ' '

   fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      body: body,
      reactions: reactions,
      userId: userId,
      tags: tags,
    })
  })
  .then(res => res.json())
  .then((post) => {
    addPost(post)
    navigate('/')
  });
  }
  return (
   
    <div className='CeatePostContainer'>
      {fetching && <LoadingSpiner/>}
      {
      !fetching && 
    <form className='create-post' onSubmit={handelOnSubmitButton}>
    <div className="mb-3">
      <label htmlFor="userId" className="form-label">Enter Your user Id here</label>
      <input type="text" ref={userIdElement} className="form-control" id="userId" placeholder='Enter Your UserID'/>
    </div>

    <div className="mb-3">
      <label htmlFor="title" className="form-label">Post Title</label>
      <input type="text" ref={titleElement} className="form-control" id="title" placeholder='How are you feeling today...'/>
    </div>
    
    <div className="mb-3">
      <label htmlFor="body" className="form-label">Post Content</label>
      <input type="text" rows={4} ref={bodyElement} className="form-control" id="body" placeholder='Tell us more about it'/>
    </div>

    <div className="mb-3">
      <label htmlFor="reactions" className="form-label">Number of reactions</label>
      <input type="text" ref={reactionsElement} className="form-control" id="reactions" placeholder='How many people reacted on this post'/>
    </div>

    <div className="mb-3">
      <label htmlFor="tags" className="form-label">Enter your hastags here</label>
      <input type="text" ref={tagsElement} className="form-control" id="tags" placeholder='Please Enter tags using space'/>
    </div>



    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
      }
    </div>
  )
}

export default CreatePost