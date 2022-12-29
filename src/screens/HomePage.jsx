import React, { useState, useEffect, useRef } from 'react'
import { Image, Dimensions, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Layout, Spinner, Text, Button } from '@ui-kitten/components'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

import Header from '../components/Header'
import Summary from '../components/Summary'
import Detail from '../components/Detail'
import Hourly from '../components/hourly/Hourly'
import Daily from '../components/daily/Daily'
import AreaChart from '../components/charts/AreaChart'
import DarkMode from '../components/DarkMode'
import AirPollution from '../components/air-pollution/AirPollution'
import AirPollutionInfo from '../components/air-pollution/AirPollutionInfo'
import Sun from '../components/Sun'
import Moon from '../components/Moon'

import globalStyles, { color } from '../constants/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getWeatherData, getAirPollution } from '../redux/slices/WeatherSlice'
import { setLocationActive, setLocations, addLocation } from '../redux/slices/locationSlice'
import { setToken } from '../redux/slices/userSlice'

import {
    dailySelector,
    hourlySelector,
    currentDataSelector,
    getLoadingSelector,
    getAirPollutionSelector,
    getLocationsSelector,
} from '../redux/selectors'

import { ConvertKToC, ConvertWindDeg, ConvertWindSpeed, ConvertPop, ConvertAqi } from '../utils'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

import { sendPushNotification, schedulePushNotification, cancelNotification } from '../utils'
import descriptionWeather from '../../assets/data/desc-weather.json'
import { AQI_DESC } from '../constants'

const screen = Dimensions.get('screen')

const HomePage = () => {
    const [isLoading, setLoading] = useState(true)
    const [coordinates, setCoordinates] = useState({})
    const [locationName, setLocationName] = useState(null)
    const [turnOnLocation, setTurnOnLocation] = useState(false)

    const dispatch = useDispatch()

    const loading = useSelector(getLoadingSelector)

    const [dailyWeather, setDailyWeather] = useState({ weather: [] })

    const dailyWeatherData = useSelector(dailySelector)

    useEffect(() => {
        if (Array.isArray(dailyWeatherData)) {
            console.log('dailyWeatherData', dailyWeatherData[0])
            setDailyWeather(dailyWeatherData[0])
        }
    }, [dailyWeatherData])

    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    const airPollution = useSelector(getAirPollutionSelector)

    const [airPollutionData, setAirPollutionData] = useState(airPollution)

    useEffect(() => {
        setAirPollutionData(airPollution)
    }, [airPollution])

    // console.log(airPollutionData)

    const current = useSelector(currentDataSelector)

    const [currentData, setCurrentData] = useState(current)

    useEffect(() => {
        setCurrentData(current)
    }, [current])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setLoading(loading)
            }, 500)
        }
    }, [loading])

    useEffect(() => {
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('@isFirstTime')
                // console.log({ value })
                if (value !== null) {
                    navigation.navigate('Home', { isFirstTime: false })
                } else {
                    navigation.navigate('WelcomePage', { isFirstTime: true })
                }
            } catch (error) {
                // Error retrieving data
            }
        }
        _retrieveData()
    }, [])

    // TODO: Lấy locations lưu trong Storage
    useEffect(() => {
        dispatch(setLocations())
            .unwrap()
            .then((originalPromiseResult) => {
                console.log('data: ', originalPromiseResult)
            })
    }, [])

    // TODO: Ưu cầu bật định vị ở điện thoại
    useEffect(() => {
        handleTurnOnLocation()
    }, [])

    // TODO: Lấy vị trí hiện tại từ Local Storage
    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@location-active')

                let data = []

                // TODO: Xử lý chuỗi JSON lấy lon, lat
                if (jsonValue !== null) {
                    data = jsonValue
                        .slice(1, jsonValue.length - 2)
                        .split(',')
                        .map((item) => item.split(':'))

                    const lon = Number(data[1][1])
                    const lat = Number(data[2][1])

                    setCoordinates({
                        lon: lon,
                        lat: lat,
                        currPosition: false,
                    })
                    // console.log(data)
                    // console.log({ lon, lat })
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [])

    // console.log(coordinates)

    // Note: Cập nhật coordinates theo Storage
    const handleTurnOnLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            console.log('permission denied')
            Alert.alert('permission denied')
            return
        }

        let location = await Location.getCurrentPositionAsync({})

        setCoordinates({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
            currPosition: true,
        })
    }

    // TODO: Lấy tên địa điểm
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            console.log(coordinates)
            dispatch(
                setLocationActive({
                    lon: coordinates.lon,
                    lat: coordinates.lat,
                    currPosition: coordinates.currPosition,
                }),
            )
                .unwrap()
                .then((originalPromiseResult) => {
                    setLocationName(originalPromiseResult.name)
                })
        }
    }, [coordinates])

    // TODO: Lấy dữ liệu One Call
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            dispatch(getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }))

            dispatch(getAirPollution({ lon: coordinates.lon, lat: coordinates.lat }))
        }
    }, [coordinates])

    const locations = useSelector(getLocationsSelector)

    // TODO: Thêm vị trí hiện tại vào Locations
    useEffect(() => {
        if (coordinates.lon && coordinates.lat && currentData) {
            if (locations.length > 0) {
                if (locationName && !_.find(locations, { name: locationName })) {
                    dispatch(
                        addLocation({
                            id: uuidv4(),
                            name: locationName,
                            lon: coordinates.lon,
                            lat: coordinates.lat,
                            currPosition: coordinates.currPosition,
                            icon: currentData.weather[0].icon || '10d',
                            temp: currentData.temp,
                            uri: imgUri,
                        }),
                    )
                }
            } else {
                dispatch(
                    addLocation({
                        id: uuidv4(),
                        name: locationName,
                        lon: coordinates.lon,
                        lat: coordinates.lat,
                        currPosition: coordinates.currPosition,
                        icon: currentData.weather[0].icon || '10d',
                        temp: currentData.temp,
                        uri: imgUri,
                    }),
                )
            }

            // console.log(currentData)
        }
        // console.log({ locations })
    }, [coordinates, currentData, imgUri])

    const navigation = useNavigation()

    const handleGoToHourlyPage = () => {
        navigation.navigate('HourlyPage')
    }

    const handleGoToDailyPage = () => {
        navigation.navigate('DailyPage')
    }

    const handleGoToGraphPage = () => {
        navigation.navigate('GraphPage')
    }

    const handleGoToAirPollutionPage = () => {
        navigation.navigate('AirPollutionPage')
    }

    const handleGoToWelcomePage = () => {
        navigation.navigate('WelcomePage')
    }

    const viewShot = useRef()

    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
            console.log('do something with ', uri)
            Sharing.shareAsync('file://' + uri)
        }),
            (error) => console.error('Oops, snapshot failed', error)
    }

    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            dispatch(setToken(token))
            setExpoPushToken(token)
        })

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification)
            },
        )

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response)
            },
        )

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

    // TODO: Push notification weather
    const [message, setMessage] = useState({ title: '', body: '' })
    const [isFirstPush, setIsFirstPush] = useState(true)
    useEffect(() => {
        console.log({ isFirstPush })
    }, [isFirstPush])
    useEffect(() => {
        setMessage({
            title: `${ConvertKToC(currentData?.temp)}°C - ${
                descriptionWeather[currentData?.weather[0]?.id]
            } | Cao: ${ConvertKToC(dailyWeather?.temp?.max)}°C - Thấp: ${ConvertKToC(
                dailyWeather?.temp?.min,
            )}°C`,
            body: `Hôm nay - ${
                descriptionWeather[dailyWeather?.weather[0]?.id]
            }. Gió ${ConvertWindDeg(dailyWeather?.wind_deg)}, tốc độ ${ConvertWindSpeed(
                dailyWeather?.wind_speed,
            )} km/h. ${
                ConvertPop(dailyWeather?.pop)
                    ? `Khả năng mưa ${ConvertPop(dailyWeather?.pop)}%.`
                    : ''
            }`,
        })

        if (ConvertPop(dailyWeather?.pop) > 40) {
            // if (isFirstPush) {
            sendPushNotification(expoPushToken, messagePop)
            setIsFirstPush(false)
            // }
        }
    }, [currentData, dailyWeather])

    // TODO: Push notification air pollution
    const [messageAirPollution, setMessageAirPollution] = useState({ title: '', body: '' })

    useEffect(() => {
        const level = ConvertAqi(airPollutionData.aqi) || 'good'
        let title = `Chất lượng không khí - ${AQI_DESC[level][0]}`
        let body

        switch (level) {
            case 'good':
                body = 'Hãy ra ngoài và tận hưởng không khí'
                break
            case 'fair':
                body = `😷 Hãy nhớ mang theo khẩu trang khi ra đường.`
                break
            case 'moderate':
                body = `😷Hãy nhớ mang theo khẩu trang khi ra đường.`
                break
            case 'poor':
                body = `⚠️Ảnh hưởng tới sức khỏe mọi người.`
                break
            case 'veryPoor':
                body = '⚠️Ảnh hưởng rất lớn tới sức khỏe mọi người '
                break
            case 'dangerous':
                body = '🔥Không nên ra đường nếu không cần thiết.'
                break
            default:
                body = `😷 Hãy nhớ mang theo khẩu trang khi ra đường.`
        }

        setMessageAirPollution({
            title,
            body,
        })
    }, [airPollutionData])

    // TODO: Push notification pop
    const [messagePop, setMessagePop] = useState({ title: '', body: '' })

    useEffect(() => {
        setMessagePop({
            title: 'Cảnh báo trời mưa',
            body: '🌧️ Hãy mang theo áo mưa khi ra đường',
        })
    }, [dailyWeather])

    useEffect(() => {
        const notifId = schedulePushNotification(message)

        return () => cancelNotification(notifId)
    }, [])

    const [isScheduled, setScheduled] = useState(false)

    useEffect(() => {
        if (message.title && message.body) {
            Notifications.cancelAllScheduledNotificationsAsync()
            schedulePushNotification(message, 15, 6)
            schedulePushNotification(messageAirPollution, 15, 6)
        }
    }, [message, messageAirPollution])

    const [imgUri, setImgUri] = useState(
        'https://images.unsplash.com/photo-1620385019253-b051a26048ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    )

    useEffect(() => {
        switch (currentData?.weather[0].main) {
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
            case 'Atmosphere':
                setImgUri(
                    'https://images.unsplash.com/photo-1416431168657-a6c4184348ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                )
                break
            case 'Clear':
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
    }, [currentData, coordinates])

    return (
        <Layout style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            {isLoading ? (
                <Layout
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spinner />
                </Layout>
            ) : (
                <>
                    <Layout style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                        <Header captureAndShareScreenshot={captureAndShareScreenshot} />
                        {/* <Header /> */}
                    </Layout>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                        <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 1 }}>
                            {/* Image */}
                            <Section>
                                <SectionBody>
                                    <Image
                                        style={styles.imageStyle}
                                        source={{
                                            uri: imgUri,
                                        }}
                                    />
                                </SectionBody>
                            </Section>
                            {/* Summary */}
                            <Section>
                                <SectionBody>
                                    <Summary />
                                </SectionBody>
                            </Section>
                            {/* Detail */}
                            <Section>
                                <SectionTitle>CHI TIẾT</SectionTitle>
                                <SectionBody>
                                    <Detail />
                                </SectionBody>
                            </Section>
                            {/* Hourly */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToHourlyPage}>
                                    HÀNG GIỜ
                                </SectionTitle>
                                <SectionBody>
                                    <Hourly />
                                </SectionBody>
                            </Section>
                            {/* Daily */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToDailyPage}>
                                    HÀNG NGÀY
                                </SectionTitle>
                                <SectionBody>
                                    <Daily />
                                </SectionBody>
                            </Section>
                            {/* Chart */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToGraphPage}>
                                    ĐỒ THỊ
                                </SectionTitle>
                                <SectionBody>
                                    <AreaChart
                                        title=""
                                        data={hourly}
                                        name="Khả năng mưa"
                                        color={color.pop}
                                        color_shadow={color.pop_shadow}
                                        type="pop"
                                        y_axis_suffix="%"
                                    />
                                </SectionBody>
                            </Section>
                            {/* Air Pollution */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToAirPollutionPage}>
                                    CHẤT LƯỢNG KHÔNG KHÍ
                                </SectionTitle>
                                <SectionBody>
                                    <AirPollution data={airPollutionData.pm25} />
                                    <AirPollutionInfo data={airPollutionData.aqi} />
                                </SectionBody>
                            </Section>
                            {/* Sun */}
                            <Section>
                                <SectionTitle>MẶT TRỜI</SectionTitle>
                                <SectionBody>
                                    <Sun
                                        sunrise={currentData?.sunrise}
                                        sunset={currentData?.sunset}
                                    />
                                </SectionBody>
                            </Section>
                            {/* Moon */}
                            {/* <Section>
                                <SectionTitle>MẶT TRĂNG</SectionTitle>
                                <SectionBody>
                                    <Moon data={currentData} />
                                </SectionBody>
                            </Section> */}
                            {/* Dark Mode */}
                            {/* <Section>
                                <SectionTitle>Dark Mode</SectionTitle>
                                <SectionBody>
                                    <DarkMode />
                                </SectionBody>
                            </Section> */}

                            {/* <Section>
                                <SectionBody>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await sendPushNotification(expoPushToken, message)
                                        }}
                                    >
                                        <Text>Get Notification Weather</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => schedulePushNotification(message)}
                                    >
                                        <Text>schedulePushNotification</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await Notifications.cancelAllScheduledNotificationsAsync()
                                        }}
                                    >
                                        <Text>cancelAllScheduledNotificationsAsync</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await sendPushNotification(
                                                expoPushToken,
                                                messageAirPollution,
                                            )
                                        }}
                                    >
                                        <Text>Get Notification Air Pollution</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await sendPushNotification(expoPushToken, messagePop)
                                        }}
                                    >
                                        <Text>Get Notification Pop</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await sendPushNotification(messagePop, 14, 40)
                                        }}
                                    >
                                        <Text>Get Notification Pop</Text>
                                    </TouchableOpacity>
                                </SectionBody>
                            </Section> */}

                            {/* <Section>
                                <SectionTitle>WelcomePage</SectionTitle>
                                <SectionBody>
                                    <TouchableOpacity onPress={handleGoToWelcomePage}>
                                        <Text>WelcomePage</Text>
                                    </TouchableOpacity>
                                </SectionBody>
                            </Section> */}
                            <Section>
                                <SectionBody>
                                    <Layout style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                textTransform: 'uppercase',
                                                fontSize: 12,
                                                fontWeight: '600',
                                                opacity: 0.7,
                                                textAlign: 'center',
                                            }}
                                        >
                                            Dữ liệu cung cấp bởi Open Weather Map
                                        </Text>
                                    </Layout>
                                </SectionBody>
                            </Section>
                        </ViewShot>
                    </ScrollView>
                </>
            )}
        </Layout>
    )
}

export default HomePage

async function registerForPushNotificationsAsync() {
    let token
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    return token
}

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: screen.width,
        borderRadius: 12,
    },
})