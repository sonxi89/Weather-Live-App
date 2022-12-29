import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState, useEffect, useContext } from 'react'

import {
    SunIcon,
    EyeIcon,
    DropletIcon,
    ThermometerIcon,
    ThermometerPlusIcon,
    PressureIcon,
} from './icons'
import { ThemeContext } from '../contexts/theme-context'

import globalStyles from '../constants/index'
import { useSelector } from 'react-redux'
import { currentDataSelector } from '../redux/selectors'
import {
    ConvertUnixTimeToUTC,
    ConvertKToC,
    ConvertVisibility,
} from '../utils/index'

const Item = (props) => (
    <Layout style={[styles.item, props.bgcolor]}>
        <props.icon />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.data}>{props.data}</Text>
    </Layout>
)

const Detail = () => {
    const [currentWeatherData, setCurrentWeatherData] = useState({})

    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    const currentData = useSelector(currentDataSelector)

    useEffect(() => {
        if (currentData !== undefined) {
            setCurrentWeatherData(currentData)
            console.log('currentData', currentData)
        }
    }, [currentData])

    const DATA_ROW_1 = [
        {
            id: '1',
            icon: ThermometerIcon,
            title: 'Nhiệt Độ',
            data: `${ConvertKToC(currentWeatherData?.feels_like)}°C`,
        },
        {
            id: '2',
            icon: DropletIcon,
            title: 'Độ Ẩm',
            data: `${
                currentWeatherData?.humidity ? currentWeatherData?.humidity : ''
            }%`,
        },
        {
            id: '3',
            icon: SunIcon,
            title: 'Chỉ Số UV',
            data: `${
                Number(currentWeatherData?.uvi).toFixed() === NaN
                    ? ''
                    : Number(currentWeatherData?.uvi).toFixed()
            }`,
        },
    ]

    const DATA_ROW_2 = [
        {
            id: '4',
            icon: EyeIcon,
            title: 'Tầm Nhìn',
            data: `${ConvertVisibility(currentWeatherData?.visibility)} km`,
        },
        {
            id: '5',
            icon: ThermometerPlusIcon,
            title: 'Điểm Sương',
            data: `${ConvertKToC(currentWeatherData?.dew_point)}°C`,
        },
        {
            id: '6',
            icon: PressureIcon,
            title: 'Ấp Suất',
            data: `${
                currentWeatherData?.pressure ? currentWeatherData?.pressure : ''
            }`,
        },
    ]

    return (
        <>
            <Layout
                style={[
                    globalStyles.flexRowSpace,
                    { marginBottom: 12, marginHorizontal: -6 },
                ]}
            >
                {DATA_ROW_1.map((item) => (
                    <Item
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        data={item.data}
                        bgcolor={{ backgroundColor: bgcolor }}
                    />
                ))}
            </Layout>
            <Layout
                style={[globalStyles.flexRowSpace, { marginHorizontal: -6 }]}
            >
                {DATA_ROW_2.map((item) => (
                    <Item
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        data={item.data}
                        bgcolor={{ backgroundColor: bgcolor }}
                    />
                ))}
            </Layout>
        </>
    )
}

export default Detail

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        marginTop: 4,
    },
    data: {
        fontSize: 28,
        fontWeight: '300',
    },
})
