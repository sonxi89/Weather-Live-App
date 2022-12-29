import { StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

import { Layout, Text } from '@ui-kitten/components'

import { AQI_COLOR } from '../../constants'

const AirPollutionItem = (props) => {
    const bgColor = props.level && AQI_COLOR[props.level] ? AQI_COLOR[props.level] : '#f5f5f5'

    const heightOfBar = (80 * props.index) / props.maxAvg

    // console.log(HeightOfBar)

    return (
        <Layout style={styles.container}>
            <Text style={styles.index}>{props.index}</Text>
            <Layout
                style={[
                    styles.bar,
                    {
                        backgroundColor: bgColor,
                        height: heightOfBar,
                    },
                ]}
            ></Layout>
            <Text style={styles.date}>{props.date}</Text>
        </Layout>
    )
}

export default AirPollutionItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    index: {
        fontSize: 14,
    },
    bar: {
        height: 80,
        width: 5,
        borderRadius: 12,
        marginVertical: 8,
    },
    date: {
        opacity: 0.7,
        fontSize: 14,
    },
})

AirPollutionItem.propTypes = {
    index: PropTypes.number,
    date: PropTypes.string,
    level: PropTypes.string,
    maxAvg: PropTypes.number,
}
