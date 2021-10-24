import React, { PureComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS, images, SIZES } from '../../constants'
import { API_CONFIG } from '../../constants/api_config'
import PopupMenu from '../commons/PopupMenu'

class BibliographyItem extends PureComponent {
    getCover() {
        if (this.props.image) {
            return {
                uri: API_CONFIG.baseUrl + '/image_docs/' + this.props.image,
            }
        } else {
            return images.cover;
        }
    }

    countItems() {
        let items = this.props.items;
        if(items) {
            items = items.split(" - ");
            return items.length;
        }

        return 0;
    }

    render() {
        return (
            <View style={styles.item}>
                <Image
                    style={{ width: 80, height: 100, alignSelf: 'center', borderRadius: 8 }}
                    source={this.getCover()}
                />
                <View style={styles.detail_item}>
                    <Text style={styles.item_title}>{this.props.title}</Text>
                    <Text style={styles.item_author}>{this.props.author}</Text>
                    <Text style={styles.item_publish}>{this.props.publish_place} {this.props.publish_year}</Text>
                    <Text style={styles.item_text}>{this.props.isbn_issn}</Text>
                    <Text style={styles.item_text}>{this.props.publisher}</Text>
                    <Text style={styles.item_text}>Copies: {this.countItems()}</Text>
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

export default BibliographyItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
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
        color: COLORS.gray1
    },
    item_title: {
        ...FONTS.h4,
        color: COLORS.primary
    },
    item_author: {
        ...FONTS.body4,
        color: COLORS.gray5,
        fontStyle: 'italic'
    },
    item_publish: {
        ...FONTS.body4,
        color: COLORS.gray5,
    },
})
