import { configureStore } from '@reduxjs/toolkit'

import weatherReducer from './slices/WeatherSlice'
import locationReducer from './slices/locationSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        location: locationReducer,
        user: userReducer,
    },
})

export default store
