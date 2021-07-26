import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS, SIZES } from '../../constants'
import PopupMenu from '../commons/PopupMenu'

const PlaceItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.item}>
                <View style={styles.detail_item}>
                    <Text style={styles.item_text}>{props.name}</Text>
                </View>
                <PopupMenu
                    size={SIZES.h3}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                />
            </View>
        </TouchableOpacity>
    )
}

export default PlaceItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 12,
        elevation: 2,
        borderRadius: 8
    },
    detail_item: {
        flex: 2,
        marginLeft: 8
    },
    item_text: {
        ...FONTS.body4,
        color: COLORS.black
    },
})
