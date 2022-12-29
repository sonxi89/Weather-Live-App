import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { Layout, Text, Icon, Avatar } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { BackIcon } from '../components/icons'
import Section, { SectionBody, SectionTitle } from '../components/Section'

import { filter, padStart } from 'lodash'

import moment from 'moment'

import { hourlySelector } from '../redux/selectors'
import {
    ConvertKToC,
    ConvertPop,
    ConvertUnixTimeToUTC,
    ConvertWindDeg,
    ConvertWindSpeed,
} from '../utils/index'

import globalStyles from '../constants/index'
import descriptionWeather from '../../assets/data/desc-weather.json'
import apis from '../apis/index'

const screen = Dimensions.get('screen')

const HourlyItem = ({ data }) => {
    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Layout style={[styles.flexRow, { alignItems: 'center', marginBottom: 4 }]}>
                <Layout
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        style={{ padding: 6, backgroundColor: '#ddd' }}
                        source={{
                            uri: apis.getWeatherIcon(data.weather[0].icon),
                        }}
                    />
                </Layout>
                <Layout style={{ flex: 8 }}>
                    <Text style={styles.textStyle}>{moment(data?.dt * 1000).format('HH:00')}</Text>
                    <Text style={[styles.textStyle]}>
                        {ConvertKToC(data?.temp)}&#176;C - Cảm Giác Như:{' '}
                        {ConvertKToC(data?.feels_like)}&#176;C
                    </Text>
                    <Text>{descriptionWeather[data?.weather[0].id]}</Text>
                </Layout>
            </Layout>
            <Layout
                style={[styles.flexRow, { alignItems: 'flex-start', justifyContent: 'center' }]}
            >
                <Layout
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#499bf1' }}>{ConvertPop(data?.pop)}%</Text>
                </Layout>
                <Layout style={{ flex: 8 }}>
                    <Text style={{ textTransform: 'capitalize' }}>
                        Gió: {ConvertWindSpeed(data?.wind_speed)} km/h,{' '}
                        {ConvertWindDeg(data?.wind_deg)}{' '}
                    </Text>
                    <Text>Chỉ Số UV: {data?.uvi}</Text>
                    <Text>Mây: {data?.clouds}%</Text>
                    <Text>Độ Ẩm: {data?.humidity}%</Text>
                    <Text>Điểm Sương: {ConvertKToC(data?.dew_point)}&#176;C</Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const HourlyPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    let isThreeDays = moment(hourlyData[0].dt * 1000).hour() !== 0

    let todayData = []
    let tomorrowData = []
    let afterTomorrowData = []

    if (isThreeDays) {
        todayData = filter(
            hourlyData,
            (value) => moment(value.dt * 1000).dayOfYear() === moment().dayOfYear(),
        )
        tomorrowData = filter(
            hourlyData,
            (value) => moment(value.dt * 1000).dayOfYear() === moment().dayOfYear() + 1,
        )
        afterTomorrowData = filter(
            hourlyData,
            (value) => moment(value.dt * 1000).dayOfYear() === moment().dayOfYear() + 2,
        )
    } else {
        todayData = filter(
            hourlyData,
            (value) => moment(value.dt * 1000).dayOfYear() === moment().dayOfYear(),
        )
        tomorrowData = filter(
            hourlyData,
            (value) => moment(value.dt * 1000).dayOfYear() === moment().dayOfYear() + 1,
        )
        afterTomorrowData = []
    }

    console.log(todayData)

    return isThreeDays ? (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowCenterAlign, { paddingHorizontal: 16 }]}>
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>48 Giờ tiếp</Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <ScrollView>
                        <Section>
                            <SectionTitle>HÔM NAY</SectionTitle>
                            <SectionBody>
                                {todayData.map((item, index) => (
                                    <HourlyItem key={index} data={item} />
                                ))}
                            </SectionBody>
                        </Section>
                        <Section>
                            <SectionTitle>NGÀY MAI</SectionTitle>
                            <SectionBody>
                                {tomorrowData.map((item, index) => (
                                    <HourlyItem key={index} data={item} />
                                ))}
                            </SectionBody>
                        </Section>
                        <Section>
                            <SectionTitle>
                                {ConvertUnixTimeToUTC(afterTomorrowData[0]?.dt, 'dddd, Do MMMM')}
                            </SectionTitle>
                            <SectionBody>
                                {afterTomorrowData.map((item, index) => (
                                    <HourlyItem key={index} data={item} />
                                ))}
                            </SectionBody>
                        </Section>
                    </ScrollView>
                </SectionBody>
            </Section>
        </Layout>
    ) : (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowCenterAlign, { paddingHorizontal: 16 }]}>
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>48 Giờ tiếp</Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingTop: 8,
                            paddingBottom: 100,
                        }}
                    >
                        <Section>
                            <SectionTitle>HÔM NAY</SectionTitle>
                            <SectionBody>
                                {todayData.map((item, index) => (
                                    <HourlyItem key={index} data={item} />
                                ))}
                            </SectionBody>
                        </Section>
                        <Section>
                            <SectionTitle>NGÀY MAI</SectionTitle>
                            <SectionBody>
                                {tomorrowData.map((item, index) => (
                                    <HourlyItem key={index} data={item} />
                                ))}
                            </SectionBody>
                        </Section>
                    </ScrollView>
                </SectionBody>
            </Section>
        </Layout>
    )
}

export default HourlyPage

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
    },

    textStyle: {
        fontSize: 18,
        fontWeight: '500',
    },

    container: {
        paddingHorizontal: 0,
    },

    wrapText: {
        flexWrap: 'wrap',
    },
})
