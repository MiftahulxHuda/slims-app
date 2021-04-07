import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Text, Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import OuterDrawerItem from '../components/OuterDrawerItem';

const DrawerContent = (props) => {
    const [mainDrawer, setMainDrawer] = useState(true);
    const [filteredItems, setFilteredItems] = useState([]);

    const toggleMainDrawer = () => {
        setMainDrawer(true);
        setFilteredItems([]);
    };

    const onItemParentPress = (key) => {
        const filteredMainDrawer = props.drawerItems.find((e) => {
            return e.key === key;
        });

        if (filteredMainDrawer.hasOwnProperty('routes')) {
            setMainDrawer(false);
            setFilteredItems(filteredMainDrawer);
        } else {
            props.navigation.toggleDrawer();
            props.navigation.navigate(filteredMainDrawer.routeName);
        }
    };

    function renderUserInfo() {
        return (
            <View style={styles.userInfoSection}>
                <View style={styles.containerUserInfoSection}>
                    <Avatar
                        rounded
                        source={{
                            uri:
                                'https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg',
                        }}
                        size={50}
                    />
                    <View style={styles.userInfoTextSection}>
                        <Text h4>SLiMS</Text>
                        <Text h5>Administrator</Text>
                    </View>
                </View>
            </View>
        );
    }

    function renderBackButton() {
        return (
            <View>
                <Divider style={{ height: 1, backgroundColor: '#e1e8ee' }} />
                <TouchableOpacity
                    onPress={() => toggleMainDrawer()}
                >
                    <View style={styles.backButtonSection}>
                        <Icon
                            name="angle-left"
                            size={25}
                            style={styles.customDrawerIcon}
                        />
                        <Text style={{ color: '#666666' }}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function renderMainDrawer() {
        return props.drawerItems.map((parent) => (
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
                    console.log(route.routeName)
                }}
            />
        ));
    }

    return (
        <ScrollView>
            <View style={styles.drawerContent}>
                {renderUserInfo()}
                {mainDrawer ? null : renderBackButton()}
            </View>
            <Divider style={{ height: 1, backgroundColor: '#e1e8ee' }} />
            <View style={styles.drawerSection}>
                {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
            </View>
        </ScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    containerUserInfoSection: {
        flexDirection: 'row',
        marginVertical: 15
    },
    userInfoTextSection: {
        flexDirection: 'column',
        marginLeft: 15
    },
    drawerSection: {
        marginTop: 15,
    },
    customDrawerIcon: {
        paddingRight: 10,
        color: '#666666'
    },
    backButtonSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 20
    },
});