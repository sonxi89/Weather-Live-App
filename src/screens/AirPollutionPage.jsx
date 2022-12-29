import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import AirPollution from '../components/air-pollution/AirPollution'

import { BackIcon } from '../components/icons'

import globalStyles from '../constants'
import { getAirPollutionSelector, getTokenSelector } from '../redux/selectors'

import { sendPushNotification } from '../utils'

const AirPollutionPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const airPollution = useSelector(getAirPollutionSelector)

    const [airPollutionData, setAirPollutionData] = useState(airPollution)

    // console.log(airPollutionData)
    // console.log(airPollutionData.o3)

    useEffect(() => {
        setAirPollutionData(airPollution)
    }, [airPollution])

    const expoPushToken = useSelector(getTokenSelector)

    const bodyMessage = 'Ô nhiễm nặng nề'

    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout
                        style={[
                            globalStyles.flexRowCenterAlign,
                            styles.containerFixedTop,
                            { paddingHorizontal: 16 },
                        ]}
                    >
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>Chất lượng không khí</Text>
                    </Layout>
                </SectionTitle>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                    <SectionBody>
                        <Section>
                            <SectionTitle>
                                <Text style={styles.title}>PM2.5</Text>
                            </SectionTitle>
                            <SectionBody>
                                <AirPollution data={airPollutionData.pm25} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>
                                <Text style={styles.title}>UVI</Text>
                            </SectionTitle>
                            <SectionBody>
                                <AirPollution data={airPollutionData.uvi} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>
                                <Text style={styles.title}>PM10</Text>
                            </SectionTitle>
                            <SectionBody>
                                <AirPollution data={airPollutionData.pm10} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>
                                <Text style={styles.title}>O3</Text>
                            </SectionTitle>
                            <SectionBody>
                                <AirPollution data={airPollutionData.o3} />
                            </SectionBody>
                        </Section>
                    </SectionBody>
                </ScrollView>
            </Section>
        </Layout>
    )
}

export default AirPollutionPage

const styles = StyleSheet.create({
    container: {
        paddingBottom: 48,
        paddingHorizontal: 0,
    },
    title: {
        // color: '#ffffff',
        opacity: 0.7,
    },
})
