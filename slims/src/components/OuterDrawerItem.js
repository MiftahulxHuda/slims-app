import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const OuterDrawerItem = ({ label, icon, routes, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
    >
        <View style={styles.backButtonSection}>
            <View style={styles.backButtonChildrenSection}>
                <Icon
                    name={icon}
                    size={SIZES.h2}
                    style={styles.customDrawerLeftIcon}
                />
                <Text style={styles.text_drawer_item}>{label}</Text>
            </View>
            {routes ? <Icon name="chevron-right" size={SIZES.h2} style={styles.customDrawerRightIcon} /> : null}
        </View>
    </TouchableOpacity>
);

export default OuterDrawerItem;

const styles = StyleSheet.create({
    customDrawerLeftIcon: {
        paddingRight: 10,
        color: COLORS.black
    },
    customDrawerRightIcon: {
        paddingRight: 20,
        color: COLORS.black
    },
    backButtonSection: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 20,
        alignItems: 'center'
    },
    backButtonChildrenSection: {
        flexGrow: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    text_drawer_item : {
        ...FONTS.body4,
        color: COLORS.black
    }
});