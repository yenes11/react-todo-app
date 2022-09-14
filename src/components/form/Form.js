import React, { useState, useEffect, useContext, useRef } from 'react';
import './Form.css';
import { customFetch } from '../todoList/TodoList';
import { GlobalContext } from '../../context/GlobalState';
import { Button } from '../button/Button';

export const Form = () => {
  const [content, setContent] = useState('');
  const { nextId, setNextId, addTodo, needIdUpdate } = useContext(GlobalContext);
  const firstInit = useRef(true);
  
  useEffect(() => {
    (async () => {
      const req = await fetch('https://631543c45b85ba9b11ddc4e7.mockapi.io/todos')
      const res = await req.json();
      let id = 0;

      res.forEach(task => {
        if (task.id > id)
          id = task.id;
        if (firstInit.current)
          addTodo(task);
      });
      firstInit.current = false;
      setNextId(++id);
    })()
  // eslint-disable-next-line
  }, [needIdUpdate])

  const addTask = async (e) => {
    e.preventDefault();
    if (content.length < 3) {
      document.querySelector('.error-message').style.display = 'block';
      return;
    }
    
    const data = {
      id: nextId,
      content: content,
      isCompleted: false
    }
    
    addTodo(data);
    setNextId(nextId + 1);
    setContent('');
    customFetch('POST', data);
  }

  const trackContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
    if (content.length >= 2)
      document.querySelector('.error-message').style.display = 'none';
  }

  return (
    <div className='form'>
        <form onSubmit={addTask}>
            <input className='content-input' type='text' placeholder='Finish the project' value={content} onChange={trackContent} />
            <Button text='Submit' click={addTask} />
            <div className='error-message'>*The task must contain at least 3 letters</div>
        </form>
    </div>
  )
}
