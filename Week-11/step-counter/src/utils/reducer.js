const initialState = { step: 0 }

export const stepReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT_STEP":
            return { ...state, step: state.step + 1 }
        default:
            return state
    }
}