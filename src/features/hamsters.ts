

import { createSlice } from '@reduxjs/toolkit'


// Since we will be fetching data from an external database, we need a way to indicate 
// the success or failure of that request to the UI so that we may update it accordingly, 
// and we accomplish this by firing actions to update the states of loading, hasErrors, and recipes.
export const initialState = {
    loading: false,
    hasErrors: false,
    hamsters: [],
}

// A slice for recipes with our 3 reducers
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
    },
})

// Three actions generated from the slice
export const { getHamsters, getHamstersSuccess, getHamstersFailure } = hamstersSlice.actions


//The selector merely exports the current state of the recipes array.
export const hamstersSelector = state => state.hamsters

// The reducer
export default hamstersSlice.reducer

// Asynchronous thunk action
export function fetchHamsters() {
    return async dispatch => {
        dispatch(getHamsters())

        try {
            const response = await fetch('http://localhost:1337/hamsters/')
            const data = await response.json()

            dispatch(getHamstersSuccess(data))
        } catch (error) {
            dispatch(getHamstersFailure())
        }
    }
}