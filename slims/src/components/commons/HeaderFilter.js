import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES } from '../../constants'

const HeaderFilter = ({ title, onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text_title}>{title}</Text>
                <TouchableOpacity
                    onPress={onClose}
                >
                    <Icon
                        name="x-circle"
                        size={SIZES.h2}
                        style={styles.icon_close}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderFilter

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: 50,
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text_title: {
        ...FONTS.h3,
        color: COLORS.primary
    },
    icon_close: {
        color: COLORS.primary
    },
})
