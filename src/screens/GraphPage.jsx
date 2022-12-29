import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

import Section, { SectionTitle, SectionBody } from '../components/Section'

import { BackIcon, ShareIcon } from '../components/icons'

import AreaChart from '../components/charts/AreaChart'
import _BarChart from '../components/charts/BarChart'

import { hourlySelector } from '../redux/selectors'

import globalStyles, { color } from '../constants'

const screen = Dimensions.get('screen')

const GraphPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    // console.log(hourly)

    const viewShot = useRef()

    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
            console.log('do something with ', uri)
            Sharing.shareAsync('file://' + uri)
        }),
            (error) => console.error('Oops, snapshot failed', error)
    }

    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout
                        style={[
                            globalStyles.flexRowSpace,
                            { paddingHorizontal: 16, width: screen.width },
                        ]}
                    >
                        <Layout style={globalStyles.flexRowCenterAlign}>
                            <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 24, fontSize: 20 }}>Đồ thị</Text>
                        </Layout>
                        <TouchableOpacity onPress={captureAndShareScreenshot} activeOpacity={0.7}>
                            <ShareIcon />
                        </TouchableOpacity>
                    </Layout>
                </SectionTitle>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                    <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 1 }}>
                        <SectionBody>
                            <Section>
                                <SectionTitle>KHẢ NĂNG MƯA</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart
                                            data={hourly}
                                            color={color.pop}
                                            type="pop"
                                            y_axis_suffix="%"
                                        />
                                    ) : null}
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionTitle>NHIỆT ĐỘ</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart
                                            data={hourly}
                                            color={color.temp}
                                            type="temp"
                                            y_axis_suffix="°"
                                        />
                                    ) : null}
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionTitle>ĐỘ ẨM</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart
                                            data={hourly}
                                            color={color.humidity}
                                            type="humidity"
                                            y_axis_suffix="%"
                                        />
                                    ) : null}
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionTitle>ĐIỂM SƯƠNG</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart
                                            data={hourly}
                                            color={color.dew_point}
                                            type="dew_point"
                                            y_axis_suffix="°"
                                        />
                                    ) : null}
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionTitle>GIÓ (KM/H)</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart data={hourly} color={color.wind} type="wind" />
                                    ) : null}
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionTitle>CHỈ SỐ UV</SectionTitle>
                                <SectionBody>
                                    {hourly.length ? (
                                        <AreaChart data={hourly} color={color.uvi} type="uvi" />
                                    ) : null}
                                </SectionBody>
                            </Section>
                        </SectionBody>
                    </ViewShot>
                </ScrollView>
            </Section>
        </Layout>
    )
}

export default GraphPage

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        paddingHorizontal: 0,
    },
})
