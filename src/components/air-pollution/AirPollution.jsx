import { StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'

import { Layout, Text } from '@ui-kitten/components'

import AirPollutionItem from './AirPollutionItem'

import { ConvertDateToDays, ConvertAqi } from '../../utils'

const AirPollution = (props) => {
    const [data, setData] = useState([])
    // console.log({ data })

    const maxAvg = _.maxBy(data, (o) => o.avg)

    // console.log(maxAvg)
    const unixTimeNow = new Date().getTime() / 1000

    // console.log(unixTimeNow)

    const handleData = () => {
        let newData = props.data.map((item) => {
            let level = ''

            level = ConvertAqi(item.avg)

            return { ...item, level: level }
        })

        newData = newData.filter((item) => {
            const unixTime = new Date(item.day).getTime() / 1000

            return unixTime > unixTimeNow - 86400
        })

        return newData
    }

    useEffect(() => {
        setData(handleData())
    }, [props.data])

    return (
        <Layout style={styles.container}>
            {data.map((item) => (
                <AirPollutionItem
                    key={item.day}
                    index={item.avg}
                    date={ConvertDateToDays(item.day)}
                    level={item.level}
                    maxAvg={maxAvg.avg}
                />
            ))}
        </Layout>
    )
}

export default AirPollution

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
