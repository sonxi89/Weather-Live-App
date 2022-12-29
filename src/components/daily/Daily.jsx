import { StyleSheet, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import globalStyles from '../../constants/index'

import { useSelector } from 'react-redux'
import { dailySelector } from '../../redux/selectors'

import DailyItem from './DailyItem'

const Daily = () => {
    const [daily, setDaily] = useState([])

    const dailyData = useSelector(dailySelector)

    useEffect(() => {
        setDaily(dailyData)
    }, [dailyData])

    // console.log(daily)

    return (
        <Layout>
            <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {daily.map((item, index) => (
                    <DailyItem key={index} data={item} active={index === 0} />
                ))}
            </ScrollView>
        </Layout>
    )
}

export default Daily

const styles = StyleSheet.create({})
