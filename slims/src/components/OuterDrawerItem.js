import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OuterDrawerItem = ({ label, icon, routes, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
    >
        <View style={styles.backButtonSection}>
            <View style={styles.backButtonChildrenSection}>
                <Icon
                    name={icon}
                    size={25}
                    style={styles.customDrawerLeftIcon}
                />
                <Text style={{ color: '#666666' }}>{label}</Text>
            </View>
            {routes ? <Icon name="chevron-right" size={25} style={styles.customDrawerRightIcon} /> : null}
        </View>
    </TouchableOpacity>
);

export default OuterDrawerItem;

const styles = StyleSheet.create({
    customDrawerLeftIcon: {
        paddingRight: 10,
        color: '#666666'
    },
    customDrawerRightIcon: {
        paddingRight: 20,
        color: '#666666'
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
    }
});