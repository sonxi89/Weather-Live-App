import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Layout, Text, Avatar } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { BackIcon } from '../components/icons'
import Section, { SectionBody, SectionTitle } from '../components/Section'

import { dailySelector } from '../redux/selectors'
import {
    ConvertKToC,
    ConvertPop,
    ConvertUnixTimeToUTC,
    ConvertWindDeg,
    ConvertWindSpeed,
} from '../utils/index'
import descWeather from '../../assets/data/desc-weather.json'

import globalStyles from '../constants/index'
import apis from '../apis/index'

const screen = Dimensions.get('screen')

const DailyItem = ({ data }) => {
    return (
        <Layout style={styles.container}>
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
                    <Text style={styles.textStyle}>
                        {ConvertUnixTimeToUTC(data?.dt, 'dddd, Do MMMM')}
                    </Text>
                    <Text style={[styles.textStyle]}>
                        {ConvertKToC(data?.temp.max)}&#176;C/{ConvertKToC(data?.temp.min)}&#176;C
                    </Text>
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
                    <Text>
                        {descWeather[data?.weather[0].id]}. Gió {ConvertWindDeg(data?.wind_deg)},
                        tốc độ {ConvertWindSpeed(data?.wind_speed)}km/h. Khả năng mưa{' '}
                        {ConvertPop(data?.pop)}%.
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const DailyPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [daily, setDaily] = useState([])

    const dailyData = useSelector(dailySelector)

    useEffect(() => {
        setDaily(dailyData)
    }, [dailyData])

    console.log(daily)

    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowCenterAlign, { paddingHorizontal: 16 }]}>
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>8 Ngày tiếp</Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}>
                        {daily.map((item, index) => (
                            <DailyItem key={index} data={item} />
                        ))}
                    </ScrollView>
                </SectionBody>
            </Section>
        </Layout>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
    },
    leftSec: {
        flexBasis: '30%',
    },

    rightSec: {
        flexBasis: '70%',
    },

    textStyle: {
        fontSize: 18,
        fontWeight: '500',
    },

    container: {
        paddingBottom: 50,
        paddingHorizontal: 0,
    },

    wrapText: {
        flexWrap: 'wrap',
    },

    imageStyle: {
        width: 100,
        height: screen.width,
        borderRadius: 12,
    },
})

export default DailyPage
