import React from 'react';

const PostsSection = ({ profileName, posts, newPost, onChangeNewPost, onCreate, likedPosts, onToggleLike, commentText, onChangeComment, onAddComment }) => {
  return (
    <>
      <section className="section">
        <div className="composer">
          <textarea className="textarea" rows={3} placeholder="Crear una publicación..." value={newPost} onChange={(e) => onChangeNewPost(e.target.value)} />
          <div className="composer__actions">
            <button className="btn btn-primary" onClick={onCreate}>Publicar</button>
          </div>
        </div>
      </section>
      {posts.map(p => (
        <section className="section post" key={p.id}>
          <div className="post__meta"><strong>{profileName}</strong> · <small className="muted">{p.date}</small></div>
          <p className="post__content">{p.content}</p>
          <div className="post__actions">
            <button className="btn btn-light" onClick={() => onToggleLike(p.id)}>
              {likedPosts.has(p.id) ? 'Te gusta' : 'Me gusta'} ({p.likes || 0})
            </button>
            <span className="muted">Comentarios ({Array.isArray(p.comments) ? p.comments.length : (p.comments || 0)})</span>
          </div>
          {Array.isArray(p.comments) && p.comments.length > 0 && (
            <div className="comment-list">
              {p.comments.map(c => (
                <div key={c.id} className="comment-item">
                  <strong>{profileName}:</strong> {c.text}
                </div>
              ))}
            </div>
          )}
          <div className="comment-form">
            <textarea className="textarea" rows={2} placeholder="Escribe un comentario..." value={commentText[p.id] || ''} onChange={(e) => onChangeComment(p.id, e.target.value)} />
            <div className="composer__actions">
              <button className="btn btn-secondary" onClick={() => onAddComment(p.id)}>Comentar</button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default PostsSection;
