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
        <MenuTrigger customStyles={{triggerWrapper: { width: 40, height: 40, alignItems: 'flex-end'}}}>
            <Icon name="more-vertical" size={props.size} color={COLORS.gray3} />
        </MenuTrigger>
        <MenuOptions>
            {
                props.onEdit ?
                    <MenuOption onSelect={props.onEdit}>
                        <Text style={styles.text}>Edit</Text>
                    </MenuOption> : null
            }

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
        color: COLORS.gray3
    }
});