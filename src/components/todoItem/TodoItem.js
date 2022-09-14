import React, { useState, useEffect, useRef } from 'react';
import './TodoItem.css';
import { ReactComponent as BinLogo } from './bin.svg';
import { ReactComponent as EditLogo } from './edit.svg';
import { ReactComponent as SaveLogo } from './done.svg';

export const TodoItem = ({ id, content, isCompleted, actions }) => {
  const [isComplete, setIsComplete] = useState(isCompleted);
  const { onDelete, onUpdate } = actions;
  const doneDiv = useRef();
  const checkMark = useRef();
  const contentRef = useRef();
  const editInputRef = useRef();
  const editLogoRef = useRef();
  const saveLogoRef = useRef();

  useEffect(() => {
    if (isComplete) {
      checkMark.current.style.display = 'block';
      doneDiv.current.style.background = '#1c86fa';
      contentRef.current.style.textDecoration = 'line-through';

    }
    else {
      checkMark.current.style.display = 'none';
      doneDiv.current.style.background = '#FFF';
      contentRef.current.style.textDecoration = 'none';
    }
  }, [isComplete])

  const toggleComplete = (e) => {
    e.preventDefault();
    onUpdate({id: id, content: content, isComplete: !isComplete})
    setIsComplete(prevIsComplete => !prevIsComplete);
  }

  const deleteTask = (e) => {
    e.preventDefault();
    onDelete(id);
  }

  const edit = (e) => {
    e.preventDefault();
    contentRef.current.style.display = 'none';
    editInputRef.current.value = content;
    editInputRef.current.style.display = 'block';
    saveLogoRef.current.style.display = 'block';
    editLogoRef.current.style.display = 'none';
    editInputRef.current.focus();
  }

  const saveChanges = (e) => {
    e.preventDefault();
    const editInputValue = editInputRef.current.value;

    editInputRef.current.style.display = 'none';
    contentRef.current.style.display = 'block';
    editLogoRef.current.style.display = 'block';
    saveLogoRef.current.style.display = 'none';

    // Prevent unnecessary PUT request
    if (editInputValue === content)
      return;

    const data = {
      id: id,
      content: editInputValue,
      isCompleted: isCompleted
    };
    onUpdate(data);
  }

  const isSubmit = (e) => {
    if (e.key === 'Enter')
      saveChanges(e);
  }

  return (
    <li>
        <div ref={doneDiv} className='completed' onClick={toggleComplete}>
          <div ref={checkMark} className='checkmark'></div>
        </div>
        <span ref={contentRef} onClick={edit} className='content-span' >{content}</span>
        <input ref={editInputRef} onKeyDown={isSubmit} onSubmit={saveChanges} type='text' className='edit-input' />
        <SaveLogo ref={saveLogoRef} onClick={saveChanges} className='save' />
        <EditLogo ref={editLogoRef} onClick={edit} className='edit' />
        <BinLogo onClick={deleteTask} className='bin' />
    </li>
  )
}