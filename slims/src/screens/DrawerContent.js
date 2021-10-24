import { DrawerContentScrollView } from '@react-navigation/drawer'
import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, images, SIZES } from '../constants';
import { DRAWER_ITEMS } from '../constants/drawer_items';
import { AuthContext } from '../contexts/AuthContext';
import OuterDrawerItem from '../components/OuterDrawerItem';

export default class DrawerContent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            mainDrawer: true,
            filteredItems: []
        }
    }

    static contextType = AuthContext

    toggleMainDrawer() {
        this.setState((previousState) => {
            return {
                mainDrawer: !previousState.mainDrawer,
            }
        });
    };

    onItemParentPress(key) {
        const filteredMainDrawer = DRAWER_ITEMS.find((e) => {
            return e.key === key;
        });

        if (filteredMainDrawer.key === "sign_out") {
            this.context.signOut();
        } else if (filteredMainDrawer.hasOwnProperty('routes')) {
            this.toggleMainDrawer();
            this.setState({
                filteredItems: filteredMainDrawer
            })
        } else {
            this.props.navigation.toggleDrawer();
            this.props.navigation.navigate(filteredMainDrawer.routeName, { screen: filteredMainDrawer.routeName });
        }
    };

    renderUserInfo() {
        return (
            <View style={styles.container_drawer_header}>
                <Text style={styles.text_slims}>SLiMS</Text>
                <Text style={styles.text_username}>Administrator</Text>
            </View>
        );
    }

    renderMainDrawer() {
        return DRAWER_ITEMS.map((parent) => (
            <OuterDrawerItem
                key={parent.key}
                label={parent.title}
                icon={parent.icon}
                routes={parent.routes}
                onPress={() => {
                    this.onItemParentPress(parent.key)
                }}
            />
        ))
    }

    renderFilteredItemsDrawer() {
        return this.state.filteredItems.routes.map((route) => (
            <OuterDrawerItem
                key={route.key}
                label={route.title}
                icon={route.icon}
                onPress={() => {
                    this.props.navigation.toggleDrawer();
                    this.props.navigation.navigate(route.routeName, { screen: route.routeName });
                }}
            />
        ));
    }

    renderBackButton() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.toggleMainDrawer()
                    this.setState({
                        filteredItems: []
                    })
                }}
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

    render() {
        return (
            <View style={styles.container}>
                {this.renderUserInfo()}
                {this.state.mainDrawer ? null : this.renderBackButton()}
                <ScrollView style={styles.drawer_content}>
                    {this.state.mainDrawer ? this.renderMainDrawer() : this.renderFilteredItemsDrawer()}
                </ScrollView>
            </View>
        )
    }
}

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
        paddingHorizontal: 16
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
        paddingRight: 8,
        color: COLORS.gray3
    },
    backButtonSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 12,
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 2,

    },
    text_back: {
        ...FONTS.body4,
        color: COLORS.gray3
    }
})
