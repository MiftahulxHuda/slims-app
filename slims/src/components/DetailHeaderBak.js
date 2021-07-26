import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES, images } from '../constants'
import PopupMenu from './PopupMenu';

export default function DetailHeaderBak(props) {
    return (
        <>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.header}>
                <Icon
                    name="chevron-left"
                    size={SIZES.h1}
                    color={COLORS.primary}
                    onPress={props.onPress}
                />
                <PopupMenu size={SIZES.h2} />
            </View>
            {/* <View style={styles.container}>
                <View style={styles.image}>
                </View>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: COLORS.lightGray2,
        alignItems: 'center'
    },
    image: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
        height: 130,
        backgroundColor: COLORS.lightBlue
    },
});