import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES, images } from '../../constants'
import PopupMenu from './PopupMenu';

export default function DetailHeader({
    iconPosition,
    icon,
    title,
    popupMenu,
    ...props
}) {
    const getFlexDirection = () => {
        if (!popupMenu) {
            if (icon && iconPosition) {
                if (iconPosition === 'left') {
                    return 'row';
                } else if (iconPosition === 'right') {
                    return 'row-reverse';
                }
            } else {
                return 'row';
            }
        } else {
            return 'row';
        }
    };

    const getJustifyContent = () => {
        if (!popupMenu) {
            return 'flex-start';
        } else {
            return 'space-between';
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={{
                ...styles.header,
                flexDirection: getFlexDirection(),
                justifyContent: getJustifyContent(),
            }}>
                {icon ? icon : null}

                {popupMenu ?
                    popupMenu :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{title}</Text>
                    </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: COLORS.lightGray4,
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