import { combineReducers } from 'redux'
// import { booksReducer } from './booksReducer'
// import { loansReducer } from './loansReducer'
// import { cardReducer } from './libraryCardReducer'
import { hamsterReducer } from './hamsterReducer'

const rootReducer = combineReducers({
    // lista med hamtrar
    // books: booksReducer,
    hamsters: hamsterReducer


    // här lägger vi till reducers, allt eftesom vi behöver dem (precis som vi gör med komponenter)
})



export { rootReducer }