import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCountries: [],
    allContinents: [],
    savedList: [],
}

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        getCountries: (state, action) => {
            state.allCountries = action.payload
        },
        getContinents: (state, action) => {
            state.allContinents = action.payload
        },
        getSaved: (state, action) => {
            state.savedList = [...state.savedList, action.payload]
        }
    }
})

export const { getCountries, getContinents, getSaved } = countriesSlice.actions

export default countriesSlice.reducer