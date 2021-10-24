import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MenuProvider } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import DrawerContent from './DrawerContent';
import BibliographyScreen from './BibliographyScreen';
import GMDScreen from './GMDScreen';
import ContentTypeScreen from './ContentTypeScreen';
import MediaTypeScreen from './MediaTypeScreen';
import CarrierTypeScreen from './CarrierTypeScreen';
import PublisherScreen from './PublisherScreen';
import AuthorScreen from './AuthorScreen';
import SubjectScreen from './SubjectScreen';
import SupplierScreen from './SupplierScreen';
import LocationScreen from './LocationScreen';
import PlaceScreen from './PlaceScreen';
import ItemStatusScreen from './ItemStatusScreen';
import CollectionTypeScreen from './CollectionTypeScreen';
import DocLanguageScreen from './DocLanguageScreen';
import FrequencyScreen from './FrequencyScreen';
import Loading from '../components/commons/Loading';
import { setIsLoading } from '../store/slice/loadingSlice';
import Blur from '../components/commons/Blur';

const Drawer = createDrawerNavigator();

class DrawerScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Blur isBlur={this.props.loading}>
                    <Loading />
                </Blur>

                <Blur isBlur={this.props.modalVisible} />

                <MenuProvider>
                    <Drawer.Navigator initialRouteName="Bibliography" drawerContent={props => <DrawerContent {...props} />}>
                        <Drawer.Screen name="Bibliography" component={BibliographyScreen} />
                        <Drawer.Screen name="GMD" component={GMDScreen} />
                        <Drawer.Screen name="ContentType" component={ContentTypeScreen} />
                        <Drawer.Screen name="MediaType" component={MediaTypeScreen} />
                        <Drawer.Screen name="CarrierType" component={CarrierTypeScreen} />
                        <Drawer.Screen name="Publisher" component={PublisherScreen} />
                        <Drawer.Screen name="Author" component={AuthorScreen} />
                        <Drawer.Screen name="Subject" component={SubjectScreen} />
                        <Drawer.Screen name="Supplier" component={SupplierScreen} />
                        <Drawer.Screen name="Location" component={LocationScreen} />
                        <Drawer.Screen name="Place" component={PlaceScreen} />
                        <Drawer.Screen name="ItemStatus" component={ItemStatusScreen} />
                        <Drawer.Screen name="CollectionType" component={CollectionTypeScreen} />
                        <Drawer.Screen name="DocLanguage" component={DocLanguageScreen} />
                        <Drawer.Screen name="Frequency" component={FrequencyScreen} />
                    </Drawer.Navigator>
                </MenuProvider>
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        loading: state.loading.isLoading,
        modalVisible: state.loading.modalVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setIsLoading,
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerScreen)

const styles = StyleSheet.create({})
