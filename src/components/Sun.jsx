import React, { useContext } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Layout, Text, Avatar } from '@ui-kitten/components'
import { ConvertUnixTimeToUTC } from '../utils'

import { ThemeContext } from '../contexts/theme-context'
import globalStyles from '../constants'

const windowWidth = Dimensions.get('window').width

const Sun = (props) => {
    // console.log(props.sunrise)
    // console.log(props.sunset)

    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    return (
        <Layout>
            <Layout
                style={[
                    globalStyles.flexRowSpace,
                    { backgroundColor: bgcolor, padding: 16, marginBottom: 12, borderRadius: 8 },
                ]}
            >
                <Layout style={[globalStyles.flexRowSpace, { backgroundColor: bgcolor }]}>
                    <Avatar source={require('../../assets/weather-icon/sunrise.png')} />
                    <Text style={{ marginLeft: 8, fontWeight: '600' }}>Bình minh</Text>
                </Layout>
                <Text style={{ color: 'rgb(253, 196, 76)' }}>
                    {ConvertUnixTimeToUTC(props?.sunrise, 'HH:mm')}
                </Text>
            </Layout>

            <Layout
                style={[
                    globalStyles.flexRowSpace,
                    { backgroundColor: bgcolor, padding: 16, borderRadius: 8 },
                ]}
            >
                <Layout style={[globalStyles.flexRowSpace, { backgroundColor: bgcolor }]}>
                    <Avatar source={require('../../assets/weather-icon/sunset.png')} />
                    <Text style={{ marginLeft: 8, fontWeight: '600' }}>Hoàng hôn</Text>
                </Layout>
                <Text style={{ color: 'rgb(253, 196, 76)' }}>
                    {ConvertUnixTimeToUTC(props?.sunset, 'HH:mm')}
                </Text>
            </Layout>
        </Layout>
    )
}

// style={{ color: 'rgb(253, 196, 76)' }}
// style={{ color: 'rgba(253, 196, 76, 0.7)' }}

export default Sun

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: 'rgba(253, 196, 76, 0.4)',
    },
})
