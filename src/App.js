import './App.css';
import { Modal } from './components/modal/Modal';
import { Header } from './components/header/Header';
import { Form } from './components/form/Form';
import { GlobalProvider } from './context/GlobalState';
import { TodoList } from './components/todoList/TodoList';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === null) {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
    else if (currentTheme !== theme)
      localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <GlobalProvider>
      <div className="App" id={theme}>
          <div className='app-wrapper'>
            <Modal />
            <Header theme={theme} toggleTheme={toggleTheme} />  
            <Form />
            <TodoList />
          </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
