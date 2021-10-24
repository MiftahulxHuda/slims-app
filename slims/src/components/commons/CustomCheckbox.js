import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import { COLORS, FONTS } from '../../constants';

const CustomCheckbox = ({
    label,
    value,
    onValueChange
}) => {
    return (
        <View style={styles.container}>
            <CheckBox
                style={styles.checkbox}
                value={value}
                onValueChange={onValueChange}
            />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

export default CustomCheckbox

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 5,
        ...FONTS.body3,
        color: COLORS.gray3
    },
})
