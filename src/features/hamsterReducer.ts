
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Hamster } from '../models/Hamster'
import HamsterDataService from "../services/hamsterService"


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
            const { id } = action.payload;
            state.hamsters = state.hamsters.filter(item => item.id !== id)
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


export const createHamster: any = createAsyncThunk(
    "hamsters/create",
    async (hamster) => {
        const res = await HamsterDataService.create(hamster);
        return res.data;
    }
);


//Asynchronous thunk action for fetching all hamsters from api
export function fetchHamsters() {
    return async dispatch => {
        dispatch(getHamsters())

        try {
            const response = await fetch('/hamsters/')
            const data = await response.json()
            //console.log("Data from fetch in reducer: ", data)
            dispatch(getHamstersSuccess(data))
        } catch (error) {
            dispatch(getHamstersFailure())
        }
    }
}







