import { StyleSheet } from 'react-native'
import { Layout, Text, Avatar } from '@ui-kitten/components'

import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'

import { NavigationIcon } from '../icons'

import {
    ConvertKToC,
    ConvertUnixTimeToUTC,
    ConvertWindSpeed,
    ConvertPop,
} from '../../utils/index'

import globalStyles from '../../constants/index'
import apis from '../../apis/index'

const DailyItem = (props) => {
    const { data, active } = props

    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    return (
        <Layout
            style={[
                styles.container,
                active ? { backgroundColor: bgcolor } : '',
            ]}
        >
            <Text style={globalStyles.mB1}>
                {`${ConvertKToC(data?.temp?.min)}° - ${ConvertKToC(
                    data?.temp?.max,
                )}°`}
            </Text>
            <Text style={[styles.text, styles.textPop]}>
                {ConvertPop(data?.pop) == 0
                    ? '   '
                    : ConvertPop(data?.pop) + '%'}
            </Text>
            <Avatar
                source={{
                    uri: apis.getWeatherIcon(data.weather[0].icon),
                }}
            />
            <Text style={[styles.text, { fontSize: 11 }]}>
                {ConvertWindSpeed(data?.wind_speed)} km/h
            </Text>
            <Text style={[styles.text]}>
                <NavigationIcon
                    style={{
                        width: 16,
                        height: 16,
                        transform: [{ rotate: `${180 + data.wind_deg}deg` }],
                    }}
                />
            </Text>
            <Text style={[styles.text, { fontSize: 14 }]}>
                {ConvertUnixTimeToUTC(data?.dt, 'dddd')}
            </Text>
        </Layout>
    )
}

export default DailyItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: 8,
    },
    text: {
        marginBottom: 8,
        fontSize: 14,
        opacity: 0.7,
    },
    textPop: {
        color: '#3366ff',
        marginBottom: 4,
    },
})
