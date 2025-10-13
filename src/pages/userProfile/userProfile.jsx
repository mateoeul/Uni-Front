// src/pages/userProfile/userProfile.jsx
import React, { useRef, useState } from 'react';
import './userProfile.css';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import AboutSection from './components/AboutSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ActivitySection from './components/ActivitySection.jsx';
import PostsSection from './components/PostsSection.jsx';

const UserProfile = () => {
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [tab, setTab] = useState('about'); // 'about' | 'posts'

  const [profile, setProfile] = useState({
    name: 'Ciro Ben Dov',
    headline: 'Estudiante secundario en ORT Argentina. Cofundador de Uni. Egresado de informática',
    avatarUrl: '',
    studyingAt: { institution: 'ORT Argentina', program: 'Informática', since: '2021' },
    about:
      '¡Hola! Soy Ciro, estudiante de 5to año en ORT Argentina en la especialidad de informática. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem natus assumenda, gravida senectus posuere sociosqu. Gravida ornare condimentum habitasse nunc mattis netus accumsan interdum, elementum neque sociis. Quis convallis etiam habitant ridiculus interdum mauris elementum.',
    education: [
      { id: 1, school: 'Canada school', title: 'Nivel inicial, Nivel primario', period: '2009-2020', icon: 'cap' },
      { id: 2, school: 'ORT Argentina', title: 'Nivel secundario: Ciclo Básico, Ciclo superior', period: '2021-2025', icon: 'ort' }
    ],
    projects: [
      {
        id: 1,
        name: 'Proyecto Uni.',
        period: '2021 - 2024',
        summary:
          'Fui Líder de Proyecto de un proceso de Change Management para la mejora de la gestión comercial, atención, comunicación y promoción de la USAL, la universidad privada más grande de la Argentina.',
        details:
          'El proyecto involucró: desarrollo del modelo de Gestión de Atención de Candidatos y los Principios de Atención de la Universidad, programa de entrenamiento, implementación de un CRM y un Plan de Marketing Directo para la captación de nuevos alumnos.'
      }
    ],
    posts: [
      { id: 101, content: 'Arrancando 5to año en ORT! 🚀', likes: 0, comments: [], date: '2025-03-02' }
    ],
    activity: [
      { id: 'a1', type: 'follow', text: 'Seguiste a Universidad de Buenos Aires', date: '2025-02-20' },
      { id: 'a2', type: 'like', text: 'Te gustó una publicación de ORT Argentina', date: '2025-02-18' }
    ]
  });

  const onPickPhoto = () => fileInputRef.current?.click();
  const onPhotoSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((p) => ({ ...p, avatarUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const updateField = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const updateEdu = (idx, key, value) => {
    setProfile((p) => {
      const copy = [...p.education];
      copy[idx] = { ...copy[idx], [key]: value };
      return { ...p, education: copy };
    });
  };
  const addEdu = () => setProfile((p) => ({ ...p, education: [...p.education, { id: Date.now(), school: '', title: '', period: '', icon: 'cap' }] }));
  const removeEdu = (idx) => setProfile((p) => ({ ...p, education: p.education.filter((_, i) => i !== idx) }));

  const updateProj = (idx, key, value) => {
    setProfile((p) => {
      const copy = [...p.projects];
      copy[idx] = { ...copy[idx], [key]: value };
      return { ...p, projects: copy };
    });
  };
  const addProj = () => setProfile((p) => ({ ...p, projects: [...p.projects, { id: Date.now(), name: '', period: '', summary: '', details: '' }] }));
  const removeProj = (idx) => setProfile((p) => ({ ...p, projects: p.projects.filter((_, i) => i !== idx) }));

  // Publications
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [commentText, setCommentText] = useState({}); // { [postId]: string }

  const createPost = () => {
    const text = newPost.trim();
    if (!text) return;
    const post = { id: Date.now(), content: text, likes: 0, comments: [], date: new Date().toISOString().slice(0, 10) };
    setProfile((p) => ({ ...p, posts: [post, ...p.posts] }));
    setNewPost('');
  };

  const toggleLike = (id) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(id);
      // actualizar likes del post (sumar o restar)
      setProfile((p) => ({
        ...p,
        posts: p.posts.map(pt => {
          if (pt.id !== id) return pt;
          const current = pt.likes || 0;
          return { ...pt, likes: isLiked ? Math.max(0, current - 1) : current + 1 };
        })
      }));
      if (isLiked) next.delete(id); else next.add(id);
      return next;
    });
  };

  const addComment = (id) => {
    const text = (commentText[id] || '').trim();
    if (!text) return;
    setProfile((p) => ({
      ...p,
      posts: p.posts.map(pt => {
        if (pt.id !== id) return pt;
        const arr = Array.isArray(pt.comments) ? pt.comments : [];
        return { ...pt, comments: [...arr, { id: Date.now(), text }] };
      })
    }));
    setCommentText((m) => ({ ...m, [id]: '' }));
  };

  const onSave = () => setEdit(false);
  const onCancel = () => setEdit(false);

  return (
    <div className="user-profile-container">
      <div className="user-card">
        <div className="user-card__header" />
        <div className="user-card__body">
          <div className="user-avatar" onClick={edit ? onPickPhoto : undefined} role={edit ? 'button' : undefined} title={edit ? 'Cambiar foto de perfil' : undefined}>
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="avatar-img" />
            ) : (
              <FaUser />
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={onPhotoSelected} style={{ display: 'none' }} />
          <div className="user-info">
            {!edit ? (
              <>
                <h2 className="user-info__name">{profile.name}</h2>
                <p className="user-info__subtitle">{profile.headline}</p>
                {profile.studyingAt?.institution && (
                  <div className="chips">
                    <span className="chip">Estudiando en {profile.studyingAt.institution}</span>
                    {profile.studyingAt.program && (<span className="chip">Programa: {profile.studyingAt.program}</span>)}
                    {profile.studyingAt.since && (<span className="chip">Desde {profile.studyingAt.since}</span>)}
                  </div>
                )}
              </>
            ) : (
              <div className="form-grid">
                <input className="input" value={profile.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Nombre" />
                <textarea className="textarea textarea-headline full" rows={3} value={profile.headline} onChange={(e) => updateField('headline', e.target.value)} placeholder="Titular (headline)" />
                <input className="input" value={profile.studyingAt?.institution || ''} onChange={(e) => setProfile(p => ({...p, studyingAt: { ...(p.studyingAt||{}), institution: e.target.value }}))} placeholder="Institución donde estudias" />
                <input className="input" value={profile.studyingAt?.program || ''} onChange={(e) => setProfile(p => ({...p, studyingAt: { ...(p.studyingAt||{}), program: e.target.value }}))} placeholder="Programa / Carrera" />
                <input className="input" value={profile.studyingAt?.since || ''} onChange={(e) => setProfile(p => ({...p, studyingAt: { ...(p.studyingAt||{}), since: e.target.value }}))} placeholder="Desde (año)" />
              </div>
            )}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {!edit ? (
              <button className="btn btn-primary" onClick={() => setEdit(true)}>Editar perfil</button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
                <button className="btn btn-primary" onClick={onSave}>Guardar</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab==='about' ? 'active' : ''}`} onClick={() => setTab('about')}>Acerca de</div>
        <div className={`tab ${tab==='posts' ? 'active' : ''}`} onClick={() => setTab('posts')}>Publicaciones</div>
      </div>

      {tab === 'about' && (
        <>
          <AboutSection about={profile.about} edit={edit} onChange={(v) => updateField('about', v)} />

          <EducationSection
            education={profile.education}
            edit={edit}
            onAdd={addEdu}
            onUpdate={updateEdu}
            onRemove={removeEdu}
          />

          <ProjectsSection
            projects={profile.projects}
            edit={edit}
            onAdd={addProj}
            onUpdate={updateProj}
            onRemove={removeProj}
          />

          <ActivitySection activity={profile.activity} />
        </>
      )}

      {tab === 'posts' && (
        <PostsSection
          profileName={profile.name}
          posts={profile.posts}
          newPost={newPost}
          onChangeNewPost={setNewPost}
          onCreate={createPost}
          likedPosts={likedPosts}
          onToggleLike={toggleLike}
          commentText={commentText}
          onChangeComment={(id, val) => setCommentText((m) => ({ ...m, [id]: val }))}
          onAddComment={addComment}
        />
      )}
    </div>
  );
};

export default UserProfile;
