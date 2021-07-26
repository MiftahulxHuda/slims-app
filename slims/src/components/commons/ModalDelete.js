import React from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'

import { COLORS, FONTS } from '../../constants'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalDelete = ({ onCancel, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={[{ width: windowWidth * 0.8 }, styles.modalView]}>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>Do you want delete this item?</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={onCancel}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={onDelete}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ModalDelete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.black,
        opacity: 0.8
    },
    modalView: {
        backgroundColor: COLORS.white,
        borderRadius: 8
    },
    contentView: {
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomWidth: 0.9,
        borderBottomColor: COLORS.lightGray4
    },
    buttonView: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: COLORS.white,
        borderRightColor: COLORS.lightGray4,
        borderRightWidth: 0.5,
        borderBottomLeftRadius: 8,
    },
    deleteButton: {
        backgroundColor: COLORS.white,
        borderLeftColor: COLORS.lightGray4,
        borderLeftWidth: 0.5,
        borderBottomRightRadius: 8,
    },
    contentText: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    cancelText: {
        ...FONTS.h3,
        color: COLORS.lightGray,
    },
    deleteText: {
        ...FONTS.h3,
        color: COLORS.primary,
    }
})
