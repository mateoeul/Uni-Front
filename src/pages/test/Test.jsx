// src/pages/Test.jsx
import { useEffect } from 'react';
import { useTest } from '../../contexts/TestContext.jsx';
import './test.css';
import CareerCard from '../../components/career/CareerCard.jsx';

const Intro = () => {
  const { startTest, loading, error } = useTest();
  return (
    <div className="test-hero">
      <h1>Test vocacional</h1>
      <p>
        Te mostraremos afirmaciones divididas en secciones de 10. Marcá aquellas con las que te sientas identificado/a.
        Al finalizar, veremos categorías y carreras recomendadas para vos.
      </p>
      {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      <div className="test-actions">
        <button className="btn-main" disabled={loading} onClick={startTest}>
          {loading ? 'Cargando...' : 'Comenzar'}
        </button>
      </div>
    </div>
  );
};

const FormView = () => {
  const { currentSlice, page, totalPages, goNext, goPrev, toggleAnswer, answers, submit, loading, error } = useTest();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="test-form">
      <h2 className="test-section-title">Sección {page + 1} de {totalPages}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '12px' }}>
        {currentSlice.map((q, idx) => (
          <label key={q.id} className="question-item">
            <input
              type="checkbox"
              checked={answers.has(q.id)}
              onChange={(e) => toggleAnswer(q.id, e.target.checked)}
            />
            <span><strong>{(page * 10) + idx + 1}.</strong> {q.enunciado || q.pregunta || q.text || q.descripcion || `Pregunta #${q.id}`}</span>
          </label>
        ))}
      </div>

      <div className="test-nav">
        <button className="btn-secondary" disabled={page === 0} onClick={goPrev}>Anterior</button>
        {page < totalPages - 1 ? (
          <button className="btn-main" onClick={goNext}>Siguiente</button>
        ) : (
          <button className="btn-main" disabled={loading} onClick={submit}>{loading ? 'Enviando...' : 'Finalizar y ver resultados'}</button>
        )}
      </div>
    </div>
  );
};

const ResultsView = () => {
  const { results } = useTest();
  const data = results?.data || {};
  const categoriasTop = data.categorias_top || [];
  const carrerasTop = data.carreras_top || [];
  const carrerasRec = data.carreras_recomendadas || [];
  const analisisCat = data.categorias_analizadas || [];
  const analisisCar = data.carreras_analizadas || [];

  return (
    <div className="test-results">
      <div className="results-header">
        <h1 style={{ margin: 0 }}>Resultados</h1>
        {data.explicacion?.logica && (
          <p className="results-explain">{data.explicacion.logica}</p>
        )}
      </div>

      <section className="results-section">
        <h2>Top categorías</h2>
        {categoriasTop.length === 0 && <p>No hay categorías destacadas.</p>}
        <ul>
          {categoriasTop.map(c => (
            <li key={c.id}>
              <strong>{c.nombre}</strong> — {c.respuestas_positivas}/{c.total_respuestas}
            </li>
          ))}
        </ul>
      </section>

      <section className="results-section">
        <h2>Top carreras</h2>
        {carrerasTop.length === 0 && <p>No hay carreras destacadas.</p>}
        <ul>
          {carrerasTop.map(c => (
            <li key={c.id}>
              <strong>{c.nombre}</strong> — {c.respuestas_positivas}/{c.total_respuestas}
            </li>
          ))}
        </ul>
      </section>

      <section className="results-section">
        <h2>Carreras recomendadas</h2>
        {carrerasRec.length === 0 && <p>No hay recomendaciones.</p>}
        <div className="results-grid">
          {carrerasRec.map(c => (
            <CareerCard
              key={c.id}
              id={c.id}
              name={c.nombre}
              description={c.descripcion}
              durationYears={c.duracion || c.duracion_en_anios || null}
            />
          ))}
        </div>
      </section>

      <details className="results-analytics">
        <summary>Ver análisis completo</summary>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '0.75rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Categorías analizadas</h4>
            <ul>
              {analisisCat.map(c => (
                <li key={c.id}>{c.nombre}: {c.respuestas_positivas}/{c.total_respuestas}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Carreras analizadas</h4>
            <ul>
              {analisisCar.map(c => (
                <li key={c.id}>{c.nombre}: {c.respuestas_positivas ?? c.relevancia ?? 0}/{c.total_respuestas ?? ''}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
};

const Test = () => {
  const { status } = useTest();

  if (status === 'intro') return <Intro />;
  if (status === 'form') return <FormView />;
  if (status === 'submitting') return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Procesando tus respuestas...</p>
    </div>
  );
  if (status === 'results') return <ResultsView />;

  return null;
};

export default Test;