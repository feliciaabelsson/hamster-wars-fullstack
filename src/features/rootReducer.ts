import { combineReducers } from 'redux'
import hamsterReducer from './hamsterReducer'
// import { reducer as formReducer } from 'redux-form'
// import { firebaseReducer } from 'react-redux-firebase'



const rootReducer = combineReducers({
    // lista med hamtrar
    hamsters: hamsterReducer,
    // firebase: firebaseReducer


    // här lägger vi till reducers, allt eftesom vi behöver dem (precis som vi gör med komponenter)
})



export { rootReducer }