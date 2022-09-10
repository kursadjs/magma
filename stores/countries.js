import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCountries: [],
    allContinents: [],
    savedList: [],
}

export const countries = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        addCountries: (state, action) => {
            state.allCountries = action.payload
        },
        addContinents: (state, action) => {
            state.allContinents = action.payload
        },
        addSaved: (state, action) => {
            state.savedList = action.payload
        },
        removeSaved: (state, action) => {
            state.savedList = action.payload
        }
    }
})

export const { addCountries, addContinents, addSaved, removeSaved, getSaved } = countries.actions

export default countries.reducer