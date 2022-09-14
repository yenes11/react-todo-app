const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            return {
              ...state,
              username: action.payload
            }

        case 'SET_NEXT_ID':
            return {
                ...state,
                nextId: action.payload
            }
        
        case 'ADD_TASK':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }

        case 'DELETE_TASK':
            return {
                ...state,
                needIdUpdate: !state.needIdUpdate,
                todos: state.todos.filter(t => t.id !== action.payload)
            }

        case 'UPDATE_TASK':
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.payload.id ? action.payload : t)
            }

        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }

        default:
            return state;
  }
}

export default reducer;