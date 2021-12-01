import { combineReducers } from 'redux'
import hamsterReducer from './hamsterReducer'


const rootReducer = combineReducers({
    // lista med hamtrar
    hamsters: hamsterReducer,
})



export { rootReducer }