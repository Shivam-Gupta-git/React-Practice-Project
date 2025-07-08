import { createContext, useEffect, useReducer, useState, } from "react";

export const PostList = createContext({
  postList: [],
  addPost: ()=>{},
  deletePost: ()=>{},
  fetching: false,
})

const PostListReducer = (currentPostList, action) => {
 let newPostList = currentPostList;
 if(action.type === 'DELETE_POST'){
  newPostList = currentPostList.filter(post => post.id !== action.payLoad.postId)
 }
 else if(action.type === 'ADD_INITIAL_POSTS'){
  newPostList = action.payLoad.posts;
 }
 else if(action.type === 'ADD_POST'){
  newPostList = [action.payLoad, ...currentPostList]
 }
 return newPostList;
}

const PostListProvider = ({children}) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, [] )
  const [fetching, setFetching] = useState(false)

  const addPost = (post)=>{
  dispatchPostList({
    type:'ADD_POST',
    payLoad: post,
  })
  }

  const deletePost = (postId)=>{
   dispatchPostList({
    type: 'DELETE_POST',
    payLoad:{
      postId
    }
   })
  }

  const addInitialPost = (posts)=>{
  dispatchPostList({
    type: 'ADD_INITIAL_POSTS',
    payLoad:{
      posts
    }
  })
  }

 useEffect(()=>{
  setFetching(true)
  const controler = new AbortController();
  const signal = controler.signal;
  fetch('https://dummyjson.com/posts', {signal})
  .then((res) => res.json())
  // .then(obj => console.log(obj.posts))
  .then((data) => {
    addInitialPost(data.posts)
    setFetching(false)
  })
  return ()=>{
    controler.abort();
  }
 }, [])

  return <PostList.Provider value={{
    postList,
    addPost,
    deletePost,
    fetching,
  }}>{children}</PostList.Provider>
}

// const DEFAULT_POST_LIST = [
//   {
//   id: '1',
//   title: 'Going to Mumbai',
//   body: 'Hi Friends, I am going to Mumbai for my Vacations. Hope to enjoy a lot. Peace Out.',
//   reactions: 2,
//   userId: 'user-9',
//   tags: ['vacations', 'mumbai', 'enjoyimg'],
// },
//   {
//   id: '2',
//   title: 'Pass Ho gye',
//   body: 'Char Saal ke Masti ke Baad bhi Pass Ho gye Bhai.Hard to Belive',
//   reactions: 15,
//   userId: 'user-12',
//   tags: ['draduations', 'Unbelievable'],
// },
// ];

export default PostListProvider;