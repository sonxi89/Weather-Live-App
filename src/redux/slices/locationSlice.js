import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import apis from '../../apis'

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
        // error reading value
    }
}

const storeData = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@' + key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const setLocationActive = createAsyncThunk('location/setLocationActive', async (params) => {
    // console.log(params)
    const res = await apis.getLocationNameByCoordinates(params.lon, params.lat)

    storeData(
        {
            name: res.data[0].local_names.vi,
            lon: params.lon,
            lat: params.lat,
            currPosition: params.currPosition,
        },
        'location-active',
    )

    return {
        name: res.data[0].local_names.vi,
        lon: params.lon,
        lat: params.lat,
        currPosition: params.currPosition,
    }
})

export const setLocations = createAsyncThunk('location/setLocations', async () => {
    const res = getData('locations')
    // console.log('setLocations')
    return res
})

// getData('locations')
const initState = {
    locationActive: '',
    locations: [],
    loading: '',
    error: '',
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initState,
    reducers: {
        addLocation: (state, action) => {
            state.locations.push(action.payload)
            // console.log(action.payload)
        },
        deleteLocation: (state, action) => {
            const newState = state.locations.filter((item) => item.id !== action.payload)
            state.locations = newState
        },
        editLocationActive: (state, action) => {
            state.locationActive = action.payload
        },
    },
    extraReducers: {
        [setLocationActive.pending]: (state) => {
            state.loading = true
        },
        [setLocationActive.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [setLocationActive.fulfilled]: (state, action) => {
            state.locationActive = action.payload
            state.loading = false
        },

        [setLocations.pending]: (state) => {
            state.loading = true
        },
        [setLocations.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [setLocations.fulfilled]: (state, action) => {
            state.locations = action.payload
            state.loading = false
            // console.log(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addLocation, deleteLocation, editLocationActive } = locationSlice.actions

export default locationSlice.reducer
