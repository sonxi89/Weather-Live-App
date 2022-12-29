import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Layout, Text, Modal, Card, Button, Radio, RadioGroup } from '@ui-kitten/components'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import Section, { SectionTitle, SectionBody } from '../components/Section'
import { BackIcon } from '../components/icons'
import { ThemeContext } from '../contexts/theme-context'
import globalStyles from '../constants'

const screen = Dimensions.get('screen')

const MENU_DATA = [
    {
        id: 1,
        title: 'Nguồn dữ liệu',
        desc: 'Open Weather Map',
    },
    {
        id: 2,
        title: 'Giao diện',
        desc: 'Sáng',
    },
    {
        id: 3,
        title: 'Góp ý',
        desc: 'Report bugs or make suggestions',
    },
    {
        id: 4,
        title: 'Về Weather Live',
        desc: 'Open Weather Map',
    },
]

const MenuItem = ({ title, desc, handleOpenModal }) => {
    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    const descCustom = context?.theme === 'dark' ? 'Tối' : 'Sáng'

    return (
        <TouchableOpacity onPress={handleOpenModal}>
            <Layout style={[styles.containerMenuItem, { borderBottomColor: bgcolor }]}>
                <Text style={styles.textMenuItem}>{title}</Text>
                {desc ? (
                    <Text style={{ fontSize: 14, opacity: 0.3 }}>
                        {title === 'Giao diện' ? descCustom : desc}
                    </Text>
                ) : null}
            </Layout>
        </TouchableOpacity>
    )
}

const SettingPage = () => {
    const [visible, setVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(() => (context?.theme === 'dark' ? 1 : 0))

    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleOnChangeRadio = (index) => {
        setSelectedIndex(index)
        context.toggleTheme()
    }

    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowSpace, { paddingHorizontal: 16 }]}>
                        <Layout style={globalStyles.flexRowCenterAlign}>
                            <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 24, fontSize: 20 }}>Cài đặt</Text>
                        </Layout>
                    </Layout>
                </SectionTitle>
                <Layout style={{ paddingHorizontal: 16 }}>
                    {MENU_DATA.map((item) => (
                        <MenuItem
                            key={item.id}
                            title={item.title}
                            desc={item.desc}
                            handleOpenModal={
                                item.title === 'Giao diện' ? () => setVisible(true) : null
                            }
                        />
                    ))}
                </Layout>
            </Section>

            <Modal
                visible={visible}
                backdropStyle={{ backgroundColor: bgcolor, opacity: 0.3 }}
                onBackdropPress={() => setVisible(false)}
            >
                <Card
                    disabled={true}
                    style={{ minWidth: screen.width - 32, backgroundColor: bgcolor }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
                        Giao diện
                    </Text>
                    <RadioGroup
                        selectedIndex={selectedIndex}
                        onChange={(index) => handleOnChangeRadio(index)}
                    >
                        <Radio>Sáng</Radio>
                        <Radio>Tối</Radio>
                    </RadioGroup>
                    <Button
                        style={{ marginTop: 12 }}
                        onPress={() => setVisible(false)}
                        appearance="ghost"
                    >
                        Thoát
                    </Button>
                </Card>
            </Modal>
        </Layout>
    )
}

export default SettingPage

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        paddingHorizontal: 0,
    },
    textMenuItem: {
        fontSize: 18,
    },
    containerMenuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
})
