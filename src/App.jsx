import './App.css'
  import AppRouter from './navigation/appRouter';
  import { TestProvider } from './contexts/TestContext.jsx';

  function App() {
    return (
      <TestProvider>
        <AppRouter />
      </TestProvider>
    );
  }
  
  export default App
