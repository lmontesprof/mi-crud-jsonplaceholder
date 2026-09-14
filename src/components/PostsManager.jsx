import { useState,useEffect } from 'react';
import { getPosts,createPost,updatePost,deletePost } from '../api/apiService';

export default function PostsManager() {
  const [posts, setPosts] = useState([]);
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [editId, setEditId] = useState(null);

 const cargaPosts=async()=>{
    try {
      const response = await getPosts();
      setPosts(response.data.slice(0,20)); // Limitar a los primeros 20 posts
    } catch (error) {
      console.error('Error al cargar los posts:', error);
    }
  };
  useEffect(() => {
    cargaPosts();
  }, []);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const payload={title,body,userId:1};
    try {
      if(editId){
        await updatePost(editId,payload);
        alert('Post actualizado correctamente');
      }else{
        const response=await createPost(payload);
        setPosts([...posts,{...payload,id:response.data.id}]);
        alert('Post creado correctamente');
      }
      limpiarFormulario();
    }catch (error) {
      console.error('Error al crear/actualizar el post:', error);
    }
};

const handleDelete=async(id)=>{
  try {
    await deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
    alert('Post eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el post:', error);
  }
};

const handleEdit=(post)=>{
  setEditId(post.id);
  setTitle(post.title);
  setBody(post.body);
};
const limpiarFormulario=()=>{
  setEditId(null);
  setTitle('');
  setBody('');
};

return (
<div className='row'>
    <div className='col-md-4 mb-4'>
         <div className="card shadow-sm p-3 sticky-top" style={{top: '20px'}}>
            <h5>{editId ? 'Editar Post' : 'Crear Post'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">Título</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>    
                <div className="mb-3">
                    <label  className="form-label">Contenido</label>
                    <textarea className="form-control" value={body} onChange={(e)=>setBody(e.target.value)} required></textarea>
                </div>  
                <button type="submit" className="btn btn-primary">{editId ? 'Actualizar' : 'Crear'}</button>
                {editId && <button type="button" className="btn btn-secondary ms-2" onClick={limpiarFormulario}>Cancelar</button>}  
            </form>
        </div>
    </div>
    <div className='col-md-8'>
        <h5>Lista de Posts</h5>
        <ul className="list-group">
            {posts.map(post => (
                <li key={post.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{post.title}</div>
                        {post.body}
                    </div>
                    <button className="btn btn-sm btn-warning me-2" onClick={()=>handleEdit(post)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(post.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    </div>
    </div>  
);
}
