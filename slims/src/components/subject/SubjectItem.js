import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, FONTS, SIZES } from '../../constants'
import PopupMenu from '../commons/PopupMenu'
import TopicType from './enum/TopicType'

class SubjectItem extends PureComponent {    
    getTopicType() {
        switch (this.props.topic_type) {
            case TopicType.TOPIC:
                return "Topic"

            case TopicType.GEOGRAPHIC:
                return "Geographic"

            case TopicType.NAME:
                return "Name"

            case TopicType.TEMPORAL:
                return "Temporal"

            case TopicType.GENRE:
                return "Genre"

            case TopicType.OCCUPATION:
                return "Occupation"

            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.detail_item}>
                    <Text style={styles.item_text}>{this.props.topic}</Text>
                    <Text style={styles.item_text}>{this.getTopicType()}</Text>
                    <Text style={styles.item_text}>{this.props.auth_list}</Text>
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

export default SubjectItem;

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
        color: COLORS.gray
    },
})
