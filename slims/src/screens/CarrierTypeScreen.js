import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS, SIZES } from '../constants';
import { setInitialValues, resetFilter } from '../store/slice/filterCarrierTypeSlice';
import { setModalVisible } from '../store/slice/loadingSlice';
import CarrierType from '../components/carrier_type/CarrierType';
import FilterCarrierType from '../components/carrier_type/FilterCarrierType';
import FormCarrierType from '../components/carrier_type/FormCarrierType';
import ButtonResetForm from '../components/commons/ButtonResetForm';

const Stack = createStackNavigator();

class CarrierTypeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="CarrierType"
        screenOptions={{
          headerMode: 'float',
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
        }}>
        <Stack.Screen
          name="CarrierType"
          options={{
            headerShown: false,
          }}
        >
          {props => {
            return (
              <CarrierType {...props}
                filter={this.props.filter}
                modalVisible={this.props.modalVisible}
                setModalVisible={this.props.setModalVisible}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FilterCarrierType"
          options={
            ({ navigation }) => ({
              headerTitle: props => (
                <Text style={{
                  ...FONTS.navigationTitle,
                  color: COLORS.white
                }}>Filter Carrier Type</Text>
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
              <FilterCarrierType {...props}
                filter={this.props.filter}
                isReset={this.props.isReset}
                setInitialValues={this.props.setInitialValues}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormCarrierType"
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
              <FormCarrierType {...props}
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
    filter: state.filterCarrierType.initialValues,
    isReset: state.filterCarrierType.isReset,
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
)(CarrierTypeScreen)