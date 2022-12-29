import { StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'

import { Layout, Text } from '@ui-kitten/components'
import { ThemeContext } from '../../contexts/theme-context'

import { ConvertAqi } from '../../utils'

import globalStyles, { AQI_COLOR, AQI_DESC } from '../../constants'

const windowWidth = Dimensions.get('window').width

const AirPollutionInfo = (props) => {
    // console.log(props.data)
    const level = ConvertAqi(props.data)
    const color = AQI_COLOR[level]

    const xOfDot = (props.data / 500) * (windowWidth - 32)

    const context = useContext(ThemeContext)
    const colorDot = context?.theme === 'dark' ? '#F5F5F5' : '#1F1F1F'

    return (
        <>
            <Layout style={[globalStyles.flexRowCenterAlign, { marginTop: 8 }]}>
                <Text style={{ color: color, fontSize: 42, marginRight: 8 }}>{props.data}</Text>
                <Layout>
                    <Text style={{ fontSize: 20 }}>{AQI_DESC[level][0]}</Text>
                    <Text style={{ opacity: 0.7, fontSize: 14, maxWidth: windowWidth / 1.5 }}>
                        {AQI_DESC[level][1]}
                    </Text>
                </Layout>
            </Layout>
            <Layout
                style={[
                    globalStyles.flexRowCenter,
                    { position: 'relative', marginTop: 28, marginBottom: 6 },
                ]}
            >
                <Layout
                    style={{
                        position: 'absolute',
                        left: xOfDot,

                        width: 8,
                        height: 8,
                        borderRadius: 50,
                        backgroundColor: colorDot,
                        zIndex: 99,
                    }}
                />
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['good'],
                        flex: 1,
                        height: 4,
                        borderBottomLeftRadius: 8,
                        borderTopLeftRadius: 8,
                        position: 'relative',
                    }}
                >
                    <Text style={styles.text}>0</Text>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['fair'],
                        flex: 1,
                        height: 4,
                    }}
                >
                    <Text style={styles.text}>50</Text>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['moderate'],
                        flex: 1,
                        height: 4,
                    }}
                >
                    <Text style={styles.text}>100</Text>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['poor'],
                        flex: 1,
                        height: 4,
                    }}
                >
                    <Text style={styles.text}>150</Text>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['veryPoor'],
                        flex: 2,
                        height: 4,
                    }}
                >
                    <Text style={styles.text}>200</Text>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: AQI_COLOR['dangerous'],
                        flex: 4,
                        height: 4,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    <Text style={styles.text}>300</Text>
                    <Text style={[styles.text, { right: 0, left: null }]}>500</Text>
                </Layout>
            </Layout>
            <Layout style={[globalStyles.flexRowSpace]}>
                <Text style={{ opacity: 0.7, fontSize: 12 }}>Tốt</Text>
                <Text style={{ opacity: 0.7, fontSize: 12 }}>Nguy hiểm</Text>
            </Layout>
        </>
    )
}

export default AirPollutionInfo

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        top: -20,
        left: 0,
        fontSize: 11,
    },
})
