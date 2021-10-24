import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS, SIZES } from '../constants';
import { setInitialValues, resetFilter } from '../store/slice/filterAuthorSlice';
import { setModalVisible } from '../store/slice/loadingSlice';
import Author from '../components/author/Author';
import FilterAuthor from '../components/author/FilterAuthor';
import FormAuthor from '../components/author/FormAuthor';
import ButtonResetForm from '../components/commons/ButtonResetForm';

const Stack = createStackNavigator();

class AuthorScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Author"
        screenOptions={{
          headerMode: 'float',
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
        }}>
        <Stack.Screen
          name="Author"
          options={{
            headerShown: false,
          }}
        >
          {props => {
            return (
              <Author {...props}
                filter={this.props.filter}
                modalVisible={this.props.modalVisible}
                setModalVisible={this.props.setModalVisible}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FilterAuthor"
          options={
            ({ navigation }) => ({
              headerTitle: props => (
                <Text style={{
                  ...FONTS.navigationTitle,
                  color: COLORS.white
                }}>Filter Author</Text>
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
              <FilterAuthor {...props}
                filter={this.props.filter}
                isReset={this.props.isReset}
                setInitialValues={this.props.setInitialValues}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormAuthor"
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
              <FormAuthor {...props}
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
    filter: state.filterAuthor.initialValues,
    isReset: state.filterAuthor.isReset,
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
)(AuthorScreen)