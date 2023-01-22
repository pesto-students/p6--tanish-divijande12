const initialState = {
    theme: 'light'
}

function themeReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        default:
            return state
    }
}

export default themeReducer
