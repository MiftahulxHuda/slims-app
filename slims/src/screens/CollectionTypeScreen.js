import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS, SIZES } from '../constants';
import { setInitialValues, resetFilter } from '../store/slice/filterCollectionTypeSlice';
import { setModalVisible } from '../store/slice/loadingSlice';
import FilterCollectionType from '../components/collection_type/FilterCollectionType';
import CollectionType from '../components/collection_type/CollectionType';
import FormCollectionType from '../components/collection_type/FormCollectionType';
import ButtonResetForm from '../components/commons/ButtonResetForm';

const Stack = createStackNavigator();

class CollectionTypeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="CollectionType"
        screenOptions={{
          headerMode: 'float',
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
        }}>
        <Stack.Screen
          name="CollectionType"
          options={{
            headerShown: false,
          }}
        >
          {props => {
            return (
              <CollectionType {...props}
                filter={this.props.filter}
                modalVisible={this.props.modalVisible}
                setModalVisible={this.props.setModalVisible}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FilterCollectionType"
          options={
            ({ navigation }) => ({
              headerTitle: props => (
                <Text style={{
                  ...FONTS.navigationTitle,
                  color: COLORS.white
                }}>Filter Collection Type</Text>
              ),
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <Icon
                    name="arrow-left"
                    size={SIZES.h2}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {
                left: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              headerRight: (props) => (
                <TouchableOpacity
                  onPress={() => this.props.resetFilter()}
                >
                  <ButtonResetForm />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: {
                right: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
            })
          }
        >
          {props => {
            return (
              <FilterCollectionType {...props}
                filter={this.props.filter}
                isReset={this.props.isReset}
                setInitialValues={this.props.setInitialValues}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormCollectionType"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Form {route.params.action == "add" ? "Add" : "Edit"}</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <Icon
                    name="arrow-left"
                    size={SIZES.h2}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {
                left: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              headerRight: (props) => (
                <TouchableOpacity
                  onPress={() => this.props.resetFilter()}
                >
                  <ButtonResetForm />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: {
                right: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
            })
          }
        >
          {props => {
            return (
              <FormCollectionType {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filterCollectionType.initialValues,
    isReset: state.filterCollectionType.isReset,
    modalVisible: state.loading.modalVisible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setInitialValues,
      resetFilter,
      setModalVisible
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionTypeScreen)