import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS, SIZES } from '../constants';
import { setInitialValues, resetFilter } from '../store/slice/filterBibliographySlice';
import { addAuthor } from '../store/slice/formBibliographySlice';
import { setModalVisible } from '../store/slice/loadingSlice';
import Bibliography from '../components/bibliography/Bibliography';
import FilterBibliography from '../components/bibliography/FilterBibliography';
import FormBibliography from '../components/bibliography/FormBibliography';
import FormAuthor from '../components/bibliography/FormAuthor';
import FormAuthorMaster from '../components/author/FormAuthor';
import FormPublisherMaster from '../components/publisher/FormPublisher';
import FormPlaceMaster from '../components/place/FormPlace';
import FormSubject from '../components/bibliography/FormSubject';
import FormAttachment from '../components/bibliography/FormAttachment';
import FormItem from '../components/bibliography/FormItem';
import FormRelation from '../components/bibliography/FormRelation';
import ButtonResetForm from '../components/commons/ButtonResetForm';
import FormSubjectMaster from '../components/subject/FormSubject';
import FormPatternItem from '../components/bibliography/FormPatternItem';

const Stack = createStackNavigator();

class BibliographyScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Bibliography"
        screenOptions={{
          headerMode: 'float',
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
        }}>
        <Stack.Screen
          name="Bibliography"
          options={{
            headerShown: false,
          }}
        >
          {props => {
            return (
              <Bibliography {...props}
                filter={this.props.filter}
                modalVisible={this.props.modalVisible}
                setModalVisible={this.props.setModalVisible}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FilterBibliography"
          options={
            ({ navigation }) => ({
              headerTitle: props => (
                <Text style={{
                  ...FONTS.navigationTitle,
                  color: COLORS.white
                }}>Filter Bibliography</Text>
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
              <FilterBibliography {...props}
                filter={this.props.filter}
                isReset={this.props.isReset}
                setInitialValues={this.props.setInitialValues}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormBibliography"
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
              <FormBibliography {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
                loading={this.props.loading}
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
                  }}>Add Author</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormAuthorMaster"
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
              <FormAuthorMaster {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormItem"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Add Item</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
              <FormItem {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormSubject"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Add Subject</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
              <FormSubject {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormSubjectMaster"
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
              <FormSubjectMaster {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormAttachment"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Add Attachment</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
              <FormAttachment {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormRelation"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Add Relation</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
              <FormRelation {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormPatternItem"
          options={
            ({ route, navigation }) => ({
              headerTitle: props => {
                return (
                  <Text style={{
                    ...FONTS.navigationTitle,
                    color: COLORS.white
                  }}>Add Pattern Item</Text>
                )
              },
              headerLeft: (props) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
              <FormPatternItem {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
                form={this.props.form}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormPublisherMaster"
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
              <FormPublisherMaster {...props}
                isReset={this.props.isReset}
                resetFilter={this.props.resetFilter}
              />
            )
          }}
        </Stack.Screen>
        <Stack.Screen
          name="FormPlaceMaster"
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
              <FormPlaceMaster {...props}
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
    filter: state.filterBibliography.initialValues,
    isReset: state.filterBibliography.isReset,
    modalVisible: state.loading.modalVisible,
    form: state.formBibliography,
    loading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setInitialValues,
      resetFilter,
      setModalVisible,
      addAuthor
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BibliographyScreen)