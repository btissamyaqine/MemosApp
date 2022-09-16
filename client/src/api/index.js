import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = 'https://localhost:5000/posts';

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => axios.get('/posts');
export const createPost = (newPost) => axios.post('posts', newPost);
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost); 
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`); 

export const signIn = (form) => API.post( '/user/signin', form );
export const signUp = (form) => API.post( '/user/signup', form );