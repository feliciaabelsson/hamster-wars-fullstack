import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './features/rootReducer'


// configureStore skapar en Redux Store
// (man kan även använda Redux-funktionen createStore men den är inte lika enkel)
const store = configureStore({
    // enda inställningen vi behöver är en root reducer
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>


export { store }