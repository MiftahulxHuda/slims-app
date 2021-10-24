import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../../constants'

const ButtonResetForm = () => {
    return (
        <>
            {/* <Icon
                name="refresh-cw"
                size={SIZES.body2}
                color={COLORS.white}
            /> */}
            <Text style={{
                color: COLORS.white,
                ...FONTS.h4
            }}>Reset</Text>
        </>
    )
}

export default ButtonResetForm

const styles = StyleSheet.create({})
