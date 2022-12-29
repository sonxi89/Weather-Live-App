import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { ThemeContext } from '../contexts/theme-context'

const slides = [
    {
        key: 'one',
        title: 'WEATHER LIVE',
        image: require('../../assets/welcome-image/intro5.jpg'),
        text: 'The best alternative weather app',
    },
    {
        key: 'two',
        title: 'CHO PHÉP QUYỀN',
        text: 'Weather Live cần quyền truy cập vị trí của bạn để hoạt động',
        image: require('../../assets/welcome-image/intro5.jpg'),
    },
]

const WelcomePage = ({ route }) => {
    const navigation = useNavigation()

    // const route = useRoute()
    // console.log(route.params.isFirstTime)

    const { toggleFirstTime } = useContext(ThemeContext)

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={item.image}></Image>
                </View>

                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 26, fontWeight: '600' }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, opacity: 0.7 }}>{item.text}</Text>
                </View>

                {item.key === 'two' ? (
                    <View style={styles.btnContainer}>
                        <Button
                            style={{ marginBottom: 12, width: screen.width / 2 }}
                            size="large"
                            appearance="outline"
                            onPress={handleSubmit}
                        >
                            Cho phép
                        </Button>
                        <Button size="medium" appearance="ghost" onPress={handleCancel}>
                            Bỏ qua
                        </Button>
                    </View>
                ) : null}
            </View>
        )
    }

    const handleSubmit = () => {
        navigation.navigate('Home')
        toggleFirstTime()
    }

    const handleCancel = () => {
        navigation.navigate('Search', { isFirstTime: true })
    }

    const _renderDoneButton = () => {
        return null
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            renderDoneButton={_renderDoneButton}
            showNextButton={false}
        />
    )
}

export default WelcomePage

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        position: 'relative',
        backgroundColor: '#1F1F1F',
    },

    imageContainer: {
        height: screen.height / 2,
        width: screen.width,
        overflow: 'hidden',
        paddingTop: 8,
        paddingHorizontal: 12,
    },

    image: {
        width: '100%',
        height: screen.width,
        borderRadius: 8,
    },

    textContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },

    btnContainer: {
        alignItems: 'center',
        paddingTop: 24,
    },
})
