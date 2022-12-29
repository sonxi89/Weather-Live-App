import { createSelector } from '@reduxjs/toolkit'

export const locatitonActiveSelector = (state) => state.location.locationActive

export const weatherDataSelector = (state) => state.weather.weatherData

export const currentDataSelector = (state) => state.weather.weatherData.current

export const dailySelector = (state) => state.weather.weatherData.daily

export const hourlySelector = (state) => state.weather.weatherData.hourly

export const getLoadingWeatherSelector = (state) => state.weather.loading

export const getLoadingLocationSelector = (state) => state.location.loading

export const getLoadingSelector = (state) => state.weather.loading

export const getAirPollutionSelector = (state) => state.weather.airPollution

export const getLocationsSelector = (state) => state.location.locations

export const getTokenSelector = (state) => state.user.token

// export const getLoadingSelector = createSelector(
//     getLoadingWeatherSelector,
//     getLoadingLocationSelector,
//     (loadingWeather, loadingLocation) => {
//         console.log(loadingWeather && loadingLocation)

//         return loadingWeather && loadingLocation
//     },
// )

// export const currentDailySelector = (state) =>
//     state.weather.weatherData.daily
