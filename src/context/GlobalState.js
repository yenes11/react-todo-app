import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    username: localStorage.getItem('username'),
    nextId: 0,
    todos: [],
    needIdUpdate: false,
    theme: 'light'
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setUsername(username) {
        localStorage.setItem('username', username);
        dispatch({
            type: 'SET_USERNAME',
            payload: username
        });
    }

    function setNextId(id) {
        dispatch({
            type: 'SET_NEXT_ID',
            payload: id
        })
    }

    function addTodo(data) {
        dispatch({
            type: 'ADD_TASK',
            payload: data
        })
    }

    function updateTodo(data) {
        dispatch({
            type: 'UPDATE_TASK',
            payload: data
        })
    }

    function deleteTodo(id) {
        dispatch({
            type: 'DELETE_TASK',
            payload: id
        })
    }

    function toggleTheme() {
        dispatch({
            type: 'TOGGLE_THEME'
        })
    }

    return (<GlobalContext.Provider value={{ username: state.username, nextId: state.nextId, todos: state.todos, theme: state.theme, needIdUpdate: state.needIdUpdate, addTodo, updateTodo, deleteTodo, setUsername, setNextId, toggleTheme }}>
        {children}
    </GlobalContext.Provider>)
}