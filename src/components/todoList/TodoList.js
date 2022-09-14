import React, { useContext } from 'react';
import { TodoItem } from '../todoItem/TodoItem';
import './TodoList.css';
import { GlobalContext } from '../../context/GlobalState';

export const TodoList = () => {
  const { todos, deleteTodo, updateTodo } = useContext(GlobalContext);

  const onDelete = (id) => {
    deleteTodo(id);
    customFetch('DELETE', id);
  }

  const onUpdate = (data) => {
    updateTodo(data);
    customFetch('PUT', data);
  }

  const actions = {
    'onDelete': onDelete,
    'onUpdate': onUpdate
  };

  return (
    <ul>
      { todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} isCompleted={todo.isCompleted} content={todo.content} actions={actions} />
      )) }
   </ul>
  )
}

const URL = 'https://631543c45b85ba9b11ddc4e7.mockapi.io/todos';
export const customFetch = async (method, data) => {
  switch(method) {
    case 'PUT':
      await fetch(`${URL}/${data.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        "id": data.id,
        "content": data.content,
        "isCompleted": data.isComplete
      })})
      break;

    case 'DELETE':
      await fetch(`${URL}/${data}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}})
      break;
    
    case 'POST':
      await fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          "id": data.id,
          "content": data.content,
          "isCompleted": data.isCompleted
      })})
      break;

    default:
      return;
}}
