import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loader: true
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeLoader: (state, action) => {
            state.loader = action.payload
        }
    }
})

export const { changeLoader } = settingsSlice.actions

export default settingsSlice.reducer