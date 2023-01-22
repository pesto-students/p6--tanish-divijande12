import { createStore } from "redux"
import { stepReducer } from "./utils/reducer"

const store = createStore(stepReducer)
export default store;