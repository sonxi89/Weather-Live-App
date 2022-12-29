import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, Dimensions } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import { ThemeContext } from '../../contexts/theme-context'

import { LineChart, BarChart } from 'react-native-chart-kit'

import {
    ConvertKToC,
    ConvertUnixTimeToUTC,
    ConvertVisibility,
    ConvertWindSpeed,
    ConvertWindDeg,
    ConvertPop,
} from '../../utils'

const screenWidth = Dimensions.get('window').width

function* yLabel() {
    yield* ['0%', '', '50%', '', '100%']
}

const _BarChart = (props) => {
    const { percen } = props

    const [data, setData] = useState(props.data.slice(0, 24))

    useEffect(() => {
        setData(props.data.slice(0, 24))
    }, [props.data])

    console.log(data)

    const yLabelIterator = yLabel()

    const context = useContext(ThemeContext)

    const bgcolor = context?.theme === 'dark' ? '#0D0D0D' : '#FFFFFF'

    const labelColor =
        context?.theme === 'dark'
            ? `rgba(255, 255, 255, 0.7)`
            : `rgba(0, 0, 0, 0.7)`

    const customData = () => {
        switch (props.type) {
            case 'pop':
                return data.map((item) => ConvertPop(item[props.type]))
            case 'temp':
                return data.map((item) => ConvertKToC(item[props.type]))
            case 'humidity':
                return data.map((item) => item[props.type])
            case 'dew_point':
                return data.map((item) => ConvertKToC(item[props.type]))
            case 'wind':
                return data.map((item) => ConvertWindSpeed(item['wind_speed']))
            case 'uvi':
                return data.map((item) => item[props.type].toFixed())
            default:
                console.log('Invalid type')
        }
    }

    const DATA = {
        labels: [
            ConvertUnixTimeToUTC(data[0]?.dt, 'HH:mm'),
            ConvertUnixTimeToUTC(data[4]?.dt, 'HH:mm'),
            ConvertUnixTimeToUTC(data[8]?.dt, 'HH:mm'),
            ConvertUnixTimeToUTC(data[12]?.dt, 'HH:mm'),
            ConvertUnixTimeToUTC(data[16]?.dt, 'HH:mm'),
            ConvertUnixTimeToUTC(data[20]?.dt, 'HH:mm'),
        ],
        datasets: [
            {
                data: customData(),
            },
        ],
    }

    const chartConfig = {
        backgroundGradientFrom: bgcolor,
        backgroundGradientTo: bgcolor,
        fillShadowGradientFrom: props.color_shadow
            ? props.color_shadow
            : props.color, //props.color
        fillShadowGradientTo: props.color_shadow
            ? props.color_shadow
            : props.color, //
        fillShadowGradientFromOpacity: props.color_shadow ? 0.9 : 0.7,
        fillShadowGradientToOpacity: props.color_shadow ? 0.9 : 0.7,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: () => props.color, //
        labelColor: () => labelColor,

        // strokeWidth: 4,
        propsForLabels: {
            fontSize: 12,
        },
    }

    return (
        <Layout style={styles.container}>
            {/* <BarChart
                data={DATA}
                width={screenWidth - 16}
                height={220}
                yAxisSuffix={percen ? '%' : ''}
                withInnerLines={false}
                chartConfig={chartConfig}
                fromZero
                style={{
                    marginVertical: 8,
                }}
            /> */}

            <BarChart
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [{ data: [10, 20, 50, 40, 20] }],
                }}
                width={Dimensions.get('window').width - 10}
                height={230}
                yAxisLabel={'$ - '}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    // backgroundGradientFrom: '#458336',
                    // backgroundGradientTo: '#458336',
                    decimalPlaces: 2,
                    color: (opacity = 255) => '#ECEFF1',
                    style: {
                        borderRadius: 12,
                        padding: 10,
                    },
                }}
            />

            {props.name ? (
                <Text style={[styles.text, { color: labelColor }]}>
                    {props.name}
                </Text>
            ) : null}
        </Layout>
    )
}

export default _BarChart

const styles = StyleSheet.create({
    container: {
        marginLeft: -12,
        position: 'relative',
    },
    text: {
        position: 'absolute',
        bottom: -8,
        right: 0,
        fontSize: 12,
        fontWeight: 'bold',
    },
})

_BarChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    name: PropTypes.string,
    color: PropTypes.string.isRequired,
    color_shadow: PropTypes.string,
    percen: PropTypes.bool,
}
