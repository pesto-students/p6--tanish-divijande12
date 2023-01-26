import { createStore } from 'redux'
import toggleReducer from './utils/reducer'

console.log(toggleReducer)
const store = createStore(toggleReducer)

export default store