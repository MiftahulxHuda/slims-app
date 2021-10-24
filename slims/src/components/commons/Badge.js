import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS } from '../../constants'

const Badge = ({ containerStyle, badgeCount }) => {
    if(!badgeCount) return null
    
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
    )
}

export default Badge

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: COLORS.white,
        ...FONTS.body4
    }
})
