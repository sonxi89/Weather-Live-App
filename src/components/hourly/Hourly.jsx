import { StyleSheet, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'

import globalStyles from '../../constants/index'

import { useSelector } from 'react-redux'
import { hourlySelector } from '../../redux/selectors'

import HourlyItem from './HourlyItem'

const Hourly = () => {
    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    return (
        <Layout>
            <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {hourly.map((item, index) => (
                    <HourlyItem key={index} data={item} active={index === 0} />
                ))}
            </ScrollView>
        </Layout>
    )
}

export default Hourly

const styles = StyleSheet.create({})
