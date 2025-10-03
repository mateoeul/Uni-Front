import { createContext, useContext, useMemo, useState } from 'react';
import questionService from '../services/question-service';

const TestContext = createContext(null);

export const useTest = () => {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error('useTest must be used within TestProvider');
  return ctx;
};

export const TestProvider = ({ children }) => {
  const [status, setStatus] = useState('intro'); // intro | form | submitting | results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(() => new Map()); // id -> boolean

  const pageSize = 10;
  const [page, setPage] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil(questions.length / pageSize) || 0;
  }, [questions.length]);

  const currentSlice = useMemo(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    return questions.slice(start, end);
  }, [questions, page]);

  const startTest = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await questionService.getQuestions();
      // assuming res.success/res.data or array
      const data = Array.isArray(res) ? res : (res?.data ?? []);
      setQuestions(data);
      setAnswers(new Map());
      setPage(0);
      setStatus('form');
    } catch (e) {
      setError(e.message || 'Error al cargar preguntas');
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (id, value) => {
    setAnswers(prev => {
      const next = new Map(prev);
      if (value) {
        next.set(id, true);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const goNext = () => setPage(p => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage(p => Math.max(p - 1, 0));

  const submit = async () => {
    setError(null);
    setStatus('submitting');
    try {
      // Enviar SOLO afirmaciones seleccionadas (true)
      if (answers.size === 0) {
        setError('Seleccioná al menos una afirmación antes de finalizar.');
        setStatus('form');
        return;
      }
      const respuestas = Array.from(answers.keys()).map(id => ({
        valor: true,
        id_pregunta: id,
      }));
      await questionService.saveAnswers({ respuestas });
      const results = await questionService.getResults();
      // normalize results to results.data if present
      const payload = results?.data ? results : { success: true, data: results };
      setResults(payload);
      setStatus('results');
    } catch (e) {
      setError(e.message || 'Error al enviar respuestas');
      setStatus('form');
    }
  };

  const [results, setResults] = useState(null);

  const value = {
    // state
    status,
    loading,
    error,
    questions,
    answers,
    page,
    pageSize,
    totalPages,
    currentSlice,
    results,
    // actions
    startTest,
    toggleAnswer,
    goNext,
    goPrev,
    submit,
    setPage,
  };

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};
