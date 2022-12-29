import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Layout, Text, Input, Icon, Button } from '@ui-kitten/components'

import { getCoordinatesByLocationName, getWeatherData } from '../apis'
import { useSelector, useDispatch } from 'react-redux'

import { addWeatherData, setLocationActive } from '../redux/slices/WeatherSlice'

import provinces from '../data/ProvinVN'

const SearchIcon = (props) => <Icon name="search" {...props} />

const Search = () => {
    const [locationName, setLocationName] = useState('')
    const [coordinates, setCoordinates] = useState({})
    const [weatherData, setWeatherData] = useState({})

    const [inputSearch, setInputSearch] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getCoordinatesByLocationName('Hà Nội').then((res) => {
            console.log(res.data)
            setLocationName('Hà Nội')
            setCoordinates({
                longitude: res.data[0].lon,
                latitude: res.data[0].lat,
            })
        })
    }, [])

    useEffect(() => {
        if (coordinates.longitude && coordinates.latitude)
            getWeatherData(coordinates.longitude, coordinates.latitude).then(
                (res) => {
                    console.log(res.data)
                    setWeatherData(res.data)
                    dispatch(addWeatherData(res.data))
                    dispatch(setLocationActive(locationName))
                },
            )
    }, [locationName, coordinates])

    useEffect(() => {
        // console.log({ coordinates })
    }, [coordinates])

    useEffect(() => {
        // console.log({ inputSearch })
    })

    const handleSearch = () => {}

    return (
        <Layout>
            <Input
                value={inputSearch}
                placeholder="Place your City"
                onChangeText={(text) => setInputSearch(text)}
            />
            <Button accessoryLeft={SearchIcon}>Search</Button>
        </Layout>
    )
}

export default Search

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
})
