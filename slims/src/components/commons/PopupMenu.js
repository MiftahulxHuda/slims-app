import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS } from '../../constants';

const PopupMenu = (props) => (
    <Menu>
        <MenuTrigger>
            <Icon name="more-vertical" size={props.size} color={COLORS.black} />
        </MenuTrigger>
        <MenuOptions>
            <MenuOption onSelect={props.onEdit}>
                <Text style={styles.text}>Edit</Text>
            </MenuOption>
            <MenuOption onSelect={props.onDelete}>
                <Text style={styles.text}>Delete</Text>
            </MenuOption>
        </MenuOptions>
    </Menu>
);

export default PopupMenu;

const styles = StyleSheet.create({
    text: {
        ...FONTS.body4,
        color: COLORS.black
    }
});