import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS, SIZES } from '../../constants'
import PopupMenu from '../commons/PopupMenu'

class BiblioAuthorItem extends PureComponent {
    getLevelName() {
        const level = this.props.levelType.find(item => item.value == this.props.level)
        return level?.label;
    }
    
    render() {
        return (
            <View style={styles.item}>
                <View style={styles.detail_item}>
                    <Text style={styles.item_text}>{this.props.author_name}</Text>
                    <Text style={styles.item_text}>{this.getLevelName(this.props.level)}</Text>
                </View>
                <PopupMenu
                    size={SIZES.h3}
                    onDelete={this.props.onDelete}
                />
            </View>
        )
    }
}

export default BiblioAuthorItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 8,
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
