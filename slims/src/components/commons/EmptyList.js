import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../../constants'

const EmptyList = () => {
    return (
        <>
            <Text style={styles.empty_list}>No Data Found</Text>
        </>
    )
}

export default EmptyList

const styles = StyleSheet.create({
    empty_list: {
        color: COLORS.primary,
        ...FONTS.h3,
        marginHorizontal: 16
    },
})
