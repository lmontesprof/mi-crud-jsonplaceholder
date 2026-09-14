import axios from 'axios';

const API= axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  //http://localhost:3000/api
  headers: {
    'Content-Type': 'application/json',
  },
});
// Consultas generales a la API de JSONPlaceholder
export const getComments=() => API.get('/comments');
export const getAlbums=() => API.get('/albums');
export const getPhotos=() => API.get('/photos');
export const getTodos=() => API.get('/todos');
export const getUsers=() => API.get('/users');


//CRUD de posts
export const getPosts=() => API.get('/posts');
export const createPost=(post) => API.post('/posts', post);
export const updatePost=(id, post) => API.put(`/posts/${id}`, post);
export const deletePost=(id) => API.delete(`/posts/${id}`);