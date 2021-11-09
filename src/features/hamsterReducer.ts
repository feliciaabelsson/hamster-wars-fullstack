
import { createSlice } from '@reduxjs/toolkit'
import { Hamster } from '../models/Hamster'


// Since we will be fetching data from an external database, we need a way to indicate 
// the success or failure of that request to the UI so that we may update it accordingly, 
// and we accomplish this by firing actions to update the states of loading, hasErrors, and recipes.
export const initialState: State = {
    loading: false,
    hasErrors: false,
    hamsters: []
}

interface State {
    loading: boolean,
    hasErrors: boolean,
    hamsters: Hamster[]
}

// A slice for hamsters with our reducers
const hamstersSlice = createSlice({
    name: 'hamsters',
    initialState,
    reducers: {
        getHamsters: state => {
            state.loading = true
        },
        getHamstersSuccess: (state, { payload }) => {
            state.hamsters = payload
            state.loading = false
            state.hasErrors = false
        },
        getHamstersFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        hamsterAdded(state, action) {
            state.hamsters.push(action.payload)
        },
        removeHamster(state, action) {
            // state.hamsters = action.payload
            const { id } = action.payload;
            // console.log(id);
            console.log(`action.payload = ${action.payload}`);
            state.hamsters = state.hamsters.filter(item => item.id !== id)
        },
        getRandomHamster(state, action) {

        }
    },
})

// The actions generated from the slice
export const { getHamsters, getHamstersSuccess, getHamstersFailure, hamsterAdded, removeHamster } = hamstersSlice.actions


//The selector merely exports the current state of the hamster array.
export const hamstersSelector = state => state.hamsters

// The reducer
export default hamstersSlice.reducer


export const deleteHamster = (id) => {
    return async dispatch => {
        dispatch(removeHamster(id));
    }
};


// Asynchronous thunk action
export function fetchHamsters() {
    return async dispatch => {
        dispatch(getHamsters())
        // dispatch(removeHamster())

        try {
            const response = await fetch('http://localhost:1337/hamsters/')
            const data = await response.json()

            dispatch(getHamstersSuccess(data))
        } catch (error) {
            dispatch(getHamstersFailure())
        }
    }
}






// // Initial state - vanligtvis så hämtar vi datan från ett API
// const initialState: Hamster[] = [
//     {
//         id: '123',
//         name: "Sixten",
//         age: 1,
//         favFood: "ostbollar",
//         loves: "springa i hamsterhjulet",
//         imgName: "hamster-1.jpg",
//         wins: 2,
//         defeats: 3,
//         games: 5
//     }

// ]


