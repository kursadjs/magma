import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loader: true
}

export const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        openLoader: state => { state.loader = true },
        closeLoader: state => { state.loader = false }
    }
})

export const { openLoader, closeLoader } = settings.actions

export default settings.reducer