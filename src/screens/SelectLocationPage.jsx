import { TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Text, Avatar } from '@ui-kitten/components'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'

import { getLocationsSelector } from '../redux/selectors'
import { deleteLocation, editLocationActive } from '../redux/slices/locationSlice'
import { getWeatherData, getAirPollution } from '../redux/slices/WeatherSlice'

import { TrashIcon, PinIcon } from '../components/icons'
import globalStyles from '../constants/index'
import apis from '../apis/index'
import { ConvertKToC } from '../utils'
import { times } from 'lodash'

const savedLocation = [
    {
        locationName: 'Đồng Đa',
        temp: 26,
        backgroundImg: '../../assets/locationBackground1.jpg',
    },
    {
        locationName: 'Hưng Yên',
        temp: 25,
        backgroundImg: '../../assets/locationBackground2.jpg',
    },
]

const LocationItem = (props) => {
    const dispatch = useDispatch()

    const handleDeleteItem = () => {
        dispatch(deleteLocation(props?.id))
    }

    const [imgUri, setImgUri] = useState(
        'https://images.unsplash.com/photo-1620385019253-b051a26048ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    )

    useEffect(() => {
        switch (props.main) {
            case 'Thunderstorm':
                setImgUri(
                    'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
                )
                break
            case 'Drizzle':
                setImgUri(
                    'https://images.unsplash.com/photo-1573151892117-efd764c9949f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80',
                )
                break
            case 'Rain':
                setImgUri(
                    'https://images.unsplash.com/photo-1620385019253-b051a26048ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
                )
                break
            case 'Snow':
                setImgUri(
                    'https://images.unsplash.com/photo-1520491417561-88c817c63414?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
                )
                break
            case 'Atmosphere': // chua co
                setImgUri(
                    'https://images.unsplash.com/photo-1416431168657-a6c4184348ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                )
                break
            case 'Clear': // chua co
                setImgUri(
                    'https://1.bp.blogspot.com/-uc3_KjDjGiY/YORjESJ0cYI/AAAAAAABEu8/NmJLdI3nIbQl3fI--PEh3RGl15JWZwt_QCLcBGAsYHQ/s0/Hinh-anh-mua-he-Taihinhanh-Vn%2B%252821%2529.jpg',
                )
                break
            case 'Clouds':
                setImgUri(
                    'https://cdn.vietnammoi.vn/2020/3/3/tung-1583219943433907347060.jpg',
                )
                break
            default:
                setImgUri(
                    'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
                )
        }
    }, [props])

    return (
        <Layout style={[styles.itemContainer]}>
            <ImageBackground
                // source={require('../../assets/locationBackground1.jpg')}
                source={{
                    uri: imgUri,
                }}
                style={[styles.image]}
                imageStyle={{ borderRadius: 4 }}
                resizeMode="cover"
            >
                <Layout
                    style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Layout
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 26, marginRight: 8 }}>
                            {props?.locationName}
                        </Text>
                        {props.currPosition ? <PinIcon /> : null}
                    </Layout>
                    <Avatar
                        style={{
                            padding: 6,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}
                        source={{
                            uri: apis.getWeatherIcon(props?.icon),
                        }}
                    ></Avatar>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <Text style={{ color: '#ffffff', fontSize: 52, fontWeight: '100' }}>
                        {ConvertKToC(props?.temp)}&#176;C
                    </Text>
                    <TouchableOpacity onPress={handleDeleteItem} style={{ marginRight: 8 }}>
                        <TrashIcon />
                    </TouchableOpacity>
                </Layout>
            </ImageBackground>
        </Layout>
    )
}

const SelectLocationPage = () => {
    const dispatch = useDispatch()

    const locations = useSelector(getLocationsSelector)

    const [locationsData, setLocationsData] = useState(locations)

    useEffect(() => {
        setLocationsData(locations)
        storeData(locations, 'locations')
        console.log('locations: ', locations)
    }, [locations])

    const storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@' + key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    // console.log({ locationsData })
    // console.log({ locations })

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToSearchPage = () => {
        navigation.navigate('Search', { isFirstTime: false })
    }

    const handleGoToHomePage = () => {
        navigation.navigate('Home')
    }

    const handleGoToSettingPage = () => {
        navigation.navigate('SettingPage')
    }

    const handleSelectLocation = (item) => {
        handleGoToHomePage()

        console.log({ lon: item.lon, lat: item.lat })

        dispatch(editLocationActive({ name: item.name, lon: item.lon, lat: item.lat }))
        dispatch(getAirPollution({ lon: item.lon, lat: item.lat }))
        dispatch(getWeatherData({ lon: item.lon, lat: item.lat }))

        storeData({ name: item.name, lon: item.lon, lat: item.lat }, 'location-active')
    }

    return (
        <Layout style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            <Layout style={[globalStyles.flexRowSpace, { paddingHorizontal: 16 }]}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
                <Layout style={globalStyles.flexRowCenterAlign}>
                    <TouchableOpacity style={{ marginRight: 24 }} onPress={handleGoToSearchPage}>
                        <SearchIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGoToSettingPage}>
                        <SettingIcon />
                    </TouchableOpacity>
                </Layout>
            </Layout>
            <ScrollView style={{ marginTop: 12 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {locationsData
                    ? locationsData.map((item) => (
                          <TouchableOpacity
                              key={item.id}
                              activeOpacity={0.9}
                              onPress={() => handleSelectLocation(item)}
                          >
                              <LocationItem
                                  locationName={item.name}
                                  temp={item.temp}
                                  id={item.id}
                                  icon={item.icon}
                                  currPosition={item?.currPosition}
                                  main={item.main_weather}
                              />
                          </TouchableOpacity>
                      ))
                    : null}
            </ScrollView>
        </Layout>
    )
}

export default SelectLocationPage

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 180,
        marginBottom: 6,
    },
    image: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
})
