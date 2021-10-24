import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS, SIZES } from '../../constants'
import PopupMenu from '../commons/PopupMenu'

class PlaceItem extends PureComponent {
    render() {
        return (
            <View style={styles.item}>
                <View style={styles.detail_item}>
                    <Text style={styles.item_text}>{this.props.place_name}</Text>
                </View>
                <PopupMenu
                    size={SIZES.h3}
                    onEdit={this.props.onEdit}
                    onDelete={this.props.onDelete}
                />
            </View>
        )
    }
}

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        marginHorizontal: 16,
        elevation: 2,
        borderRadius: 8
    },
    detail_item: {
        flex: 2,
        marginLeft: 8
    },
    item_text: {
        ...FONTS.body4,
        color: COLORS.gray3
    },
})
