import { DrawerContentScrollView } from '@react-navigation/drawer'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, images, SIZES } from '../constants';
import { DRAWER_ITEMS } from '../constants/drawer_items';
import { AuthContext } from '../contexts/AuthContext';
import OuterDrawerItem from '../components/OuterDrawerItem';

const DrawerContent = (props) => {
    const [mainDrawer, setMainDrawer] = useState(true);
    const [filteredItems, setFilteredItems] = useState([]);

    const toggleMainDrawer = () => {
        setMainDrawer(true);
        setFilteredItems([]);
    };

    const { signOut } = React.useContext(AuthContext);

    const onItemParentPress = (key) => {
        const filteredMainDrawer = DRAWER_ITEMS.find((e) => {
            return e.key === key;
        });

        if (filteredMainDrawer.key === "sign_out") {
            signOut();
        } else if (filteredMainDrawer.hasOwnProperty('routes')) {
            setMainDrawer(false);
            setFilteredItems(filteredMainDrawer);
        } else {
            props.navigation.toggleDrawer();
            props.navigation.navigate(filteredMainDrawer.routeName);
        }
    };

    function renderUserInfo() {
        return (
            <View style={styles.container_drawer_header}>
                <Text style={styles.text_slims}>SLiMS</Text>
                <Text style={styles.text_username}>Administrator</Text>
            </View>
        );
    }

    function renderMainDrawer() {
        return DRAWER_ITEMS.map((parent) => (
            <OuterDrawerItem
                key={parent.key}
                label={parent.title}
                icon={parent.icon}
                routes={parent.routes}
                onPress={() => {
                    onItemParentPress(parent.key)
                }}
            />
        ))
    }

    function renderFilteredItemsDrawer() {
        return filteredItems.routes.map((route) => (
            <OuterDrawerItem
                key={route.key}
                label={route.title}
                icon={route.icon}
                onPress={() => {
                    props.navigation.toggleDrawer();
                    props.navigation.navigate(route.routeName);
                }}
            />
        ));
    }

    function renderBackButton() {
        return (
            <TouchableOpacity
                onPress={() => toggleMainDrawer()}
            >
                <View style={styles.backButtonSection}>
                    <Icon
                        name="chevron-left"
                        size={SIZES.h2}
                        style={styles.customDrawerIcon}
                    />
                    <Text style={styles.text_back}>Back</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {renderUserInfo()}
            {mainDrawer ? null : renderBackButton()}
            <ScrollView style={styles.drawer_content}>
                {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
            </ScrollView>
        </View>
    )
}

export default DrawerContent

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_drawer_header: {
        backgroundColor: COLORS.primary,
        height: windowHeight * 0.16,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    text_slims: {
        ...FONTS.h3,
        color: COLORS.white
    },
    text_username: {
        ...FONTS.body4,
        color: COLORS.white
    },
    drawer_content: {
        flex: 1
    },
    customDrawerIcon: {
        paddingRight: 10,
        color: COLORS.black
    },
    backButtonSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 20,
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 2,

    },
    text_back: {
        ...FONTS.body4,
        color: COLORS.black
    }
})
