import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { ExpandIcon } from './icons'

import globalStyles from '../constants'

const Section = (props) => {
    return <Layout style={{ marginBottom: 16 }}>{props.children}</Layout>
}

export const SectionTitle = (props) => {
    const { expand, onPress } = props
    // console.log(props)
    return (
        <Layout
            style={[
                { marginVertical: 12 },
                expand ? globalStyles.flexRowSpace : '',
            ]}
        >
            <Text category="s1">{props.children}</Text>
            {expand ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress ? onPress : ''}
                >
                    <ExpandIcon
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </TouchableOpacity>
            ) : null}
        </Layout>
    )
}

export const SectionBody = (props) => {
    return <Layout>{props.children}</Layout>
}

export default Section
