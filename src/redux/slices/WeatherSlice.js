import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import apis from '../../apis'

export const getWeatherData = createAsyncThunk(
    'weather/getWeatherData',
    async (params, thunkAPI) => {
        const res = await apis.getWeatherData(params.lon, params.lat)

        // storeData(res.data, 'weather')

        return res.data
    },
)

export const getAirPollution = createAsyncThunk(
    'weather/getAirPollution',
    async (params, thunkAPI) => {
        const res = await apis.getAirPollution(params.lon, params.lat)

        // storeData({ ...res.data.data.forecast.daily, aqi: res.data.data.aqi }, 'air-pollution')

        return { ...res.data.data.forecast.daily, aqi: res.data.data.aqi }
    },
)

const storeData = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@' + key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

const initState = {
    weatherData: {},
    airPollution: {},
    loading: true,
    error: '',
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initState,
    reducers: {
        addWeatherData: (state, action) => {
            state.weatherData = action.payload
        },
    },
    extraReducers: {
        [getWeatherData.pending]: (state) => {
            state.loading = true
        },
        [getWeatherData.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [getWeatherData.fulfilled]: (state, action) => {
            state.weatherData = action.payload
            state.loading = false
        },

        [getAirPollution.pending]: (state) => {
            state.loading = true
        },
        [getAirPollution.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [getAirPollution.fulfilled]: (state, action) => {
            state.airPollution = action.payload
            state.loading = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { addWeatherData } = weatherSlice.actions

export default weatherSlice.reducer
