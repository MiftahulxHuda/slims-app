import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../constants'

const Blur = (props) => {
    if (!props.isBlur) return null

    return (
        <>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />

            <View style={[styles.blur, { zIndex: 1 }]}>
                {props.children}
            </View>
        </>
    )
}

export default Blur

const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        backgroundColor: COLORS.black,
        width: '100%',
        height: '100%',
        opacity: 0.8,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
