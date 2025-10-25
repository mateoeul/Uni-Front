// src/components/profileSections/PostsSection.jsx
import React, { useState } from 'react';

const PostsSection = ({ section, edit = false, onUpdate, profileName = 'Usuario' }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const posts = datos || [];
  
  // Estados para manejar posts
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [commentText, setCommentText] = useState({});
  
  const handleCreatePost = () => {
    const text = newPost.trim();
    if (!text) return;
    
    const post = {
      id: Date.now(),
      content: text,
      likes: 0,
      comments: [],
      date: new Date().toISOString().slice(0, 10)
    };
    
    if (onUpdate) {
      onUpdate(section, [...posts, post]);
    }
    setNewPost('');
  };
  
  const handleToggleLike = (postId) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(postId);
      
      // Actualizar likes del post
      if (onUpdate) {
        const updatedPosts = posts.map(post => {
          if (post.id !== postId) return post;
          const current = post.likes || 0;
          return { ...post, likes: isLiked ? Math.max(0, current - 1) : current + 1 };
        });
        onUpdate(section, updatedPosts);
      }
      
      if (isLiked) next.delete(postId); 
      else next.add(postId);
      return next;
    });
  };
  
  const handleAddComment = (postId) => {
    const text = (commentText[postId] || '').trim();
    if (!text) return;
    
    if (onUpdate) {
      const updatedPosts = posts.map(post => {
        if (post.id !== postId) return post;
        const arr = Array.isArray(post.comments) ? post.comments : [];
        return { ...post, comments: [...arr, { id: Date.now(), text }] };
      });
      onUpdate(section, updatedPosts);
    }
    setCommentText((m) => ({ ...m, [postId]: '' }));
  };
  
  return (
    <div className="posts-section">
      <div className="section-content">
        {/* Composer para crear posts */}
        <div className="composer">
          <textarea 
            className="textarea" 
            rows={3} 
            placeholder="Crear una publicación..." 
            value={newPost} 
            onChange={(e) => setNewPost(e.target.value)} 
          />
          <div className="composer__actions">
            <button className="btn btn-primary" onClick={handleCreatePost}>
              Publicar
            </button>
          </div>
        </div>
        
        {/* Lista de posts */}
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post" key={post.id}>
              <div className="post__meta">
                <strong>{profileName}</strong> · <small className="muted">{post.date}</small>
              </div>
              <p className="post__content">{post.content}</p>
              <div className="post__actions">
                <button 
                  className="btn btn-light" 
                  onClick={() => handleToggleLike(post.id)}
                >
                  {likedPosts.has(post.id) ? 'Te gusta' : 'Me gusta'} ({post.likes || 0})
                </button>
                <span className="muted">
                  Comentarios ({Array.isArray(post.comments) ? post.comments.length : (post.comments || 0)})
                </span>
              </div>
              
              {/* Comentarios existentes */}
              {Array.isArray(post.comments) && post.comments.length > 0 && (
                <div className="comment-list">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <strong>{profileName}:</strong> {comment.text}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Formulario de comentario */}
              <div className="comment-form">
                <textarea 
                  className="textarea" 
                  rows={2} 
                  placeholder="Escribe un comentario..." 
                  value={commentText[post.id] || ''} 
                  onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))} 
                />
                <div className="composer__actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleAddComment(post.id)}
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No hay publicaciones aún.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsSection;
