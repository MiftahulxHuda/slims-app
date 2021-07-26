import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS, SIZES } from '../../constants';

export default class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'chevron-up' : 'chevron-down'} size={SIZES.h3} color={COLORS.gray1} />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Text>{this.props.data}</Text>
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.gray,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
    },
    parentHr: {
        height: 1,
        color: COLORS.white,
        width: '100%'
    },
    child: {
        backgroundColor: COLORS.lightGray2,
        padding: 16,
    }
});