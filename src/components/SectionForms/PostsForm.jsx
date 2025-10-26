import React, { useState } from 'react';

const PostsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    posts: [
      {
        id: Date.now(),
        content: '',
        date: new Date().toISOString().slice(0, 10)
      }
    ]
  });

  const handleChange = (index, field, value) => {
    const updatedPosts = [...formData.posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      posts: updatedPosts
    }));
  };

  const addPost = () => {
    setFormData(prev => ({
      ...prev,
      posts: [
        ...prev.posts,
        {
          id: Date.now(),
          content: '',
          date: new Date().toISOString().slice(0, 10)
        }
      ]
    }));
  };

  const removePost = (index) => {
    if (formData.posts.length > 1) {
      setFormData(prev => ({
        ...prev,
        posts: prev.posts.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section-form">
      <h3>Agregar Sección Publicaciones</h3>
      <form onSubmit={handleSubmit}>
        {formData.posts.map((post, index) => (
          <div key={post.id} className="post-item">
            <div className="form-group">
              <label>Contenido de la Publicación</label>
              <textarea
                value={post.content}
                onChange={(e) => handleChange(index, 'content', e.target.value)}
                placeholder="Escribe tu publicación..."
                rows={4}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={post.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                required
              />
            </div>
            
            {formData.posts.length > 1 && (
              <button
                type="button"
                onClick={() => removePost(index)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addPost}
          className="btn btn-light"
        >
          + Agregar otra publicación
        </button>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Agregar Sección
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostsForm;
