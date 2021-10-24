import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES, images } from '../../constants'
import Badge from './Badge';
import CustomButton from './CustomButton';

export default function Header({
    onBack,
    onAdd,
    title,
    onPressFilter,
    styleTextTitle = { flex: 2 },
    filterCount,
    ...props
}) {
    return (
        <>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={styles.header}
                source={images.header}
            >
                <View style={styles.iconHeader}>
                    <Icon
                        name="menu"
                        size={SIZES.h1}
                        color={COLORS.white}
                        onPress={() => { onBack() }}
                    />
                    <Icon
                        name="plus-circle"
                        size={SIZES.h1}
                        color={COLORS.white}
                        onPress={() => { onAdd() }}
                    />
                </View>
                <Text style={[
                    styles.text_title,
                    styleTextTitle
                ]}>
                    {title}
                </Text>
            </ImageBackground>
            <CustomButton
                containerStyle={styles.container_button_filter}
                buttonStyle={styles.button_filter}
                titleStyle={styles.text_filter}
                title="Filter"
                onPress={onPressFilter}
                icon={
                    <Icon
                        name="filter"
                        size={SIZES.h3}
                        style={styles.icon_filter}
                    />
                }
                badge={
                    <Badge
                        badgeCount={filterCount}
                        containerStyle={{marginRight: 8}}
                    />
                }
            />
            {/* <TouchableOpacity onPress={onPressFilter} style={styles.container_button_filter}>
                <View style={styles.button_filter}>
                    <Icon
                        name="filter"
                        size={SIZES.h3}
                        style={styles.icon_filter}
                    />
                    <Text style={styles.text_filter}>Filter</Text>
                </View>
            </TouchableOpacity> */}
        </>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const headerHeight = windowHeight * 0.26;

const styles = StyleSheet.create({
    header: {
        height: headerHeight,
        paddingHorizontal: 16,
        paddingTop: statusBarHeight,
        // paddingBottom: headerHeight - 25,
        flexDirection: 'column'
    },
    iconHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2
    },
    text_title: {
        ...FONTS.h2,
        color: COLORS.white,
        // backgroundColor: COLORS.black,
    },
    container_button_filter: {
        position: 'absolute',
        top: headerHeight - 25,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 1
    },
    button_filter: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    icon_filter: {
        color: COLORS.primary
    },
    text_filter: {
        ...FONTS.h3,
        color: COLORS.primary,
        marginLeft: 12
    },
});