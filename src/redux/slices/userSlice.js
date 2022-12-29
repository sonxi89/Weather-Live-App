import { createSlice } from '@reduxjs/toolkit'

const initState = {
    token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken } = userSlice.actions

export default userSlice.reducer
