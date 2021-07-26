import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik'
import * as yup from 'yup';
import CheckBox from '@react-native-community/checkbox';

import { COLORS, FONTS, SIZES } from '../../constants'
import DetailHeader from '../commons/DetailHeader'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import CustomCheckbox from '../commons/CustomCheckbox';

let schema = yup.object().shape({
    code: yup.string().required("Code is required"),
    name: yup.string().required("Name is required"),
});

const FormItemStatus = ({ route, navigation }) => {
    const { action } = route.params;

    let actionTitle = "";
    if (action == "add") {
        actionTitle = "Add";
    } else {
        actionTitle = "Edit";
    }

    return (
        <View style={styles.container}>
            <DetailHeader
                title={actionTitle + " Item Status"}
                iconPosition="left"
                icon={
                    <Icon
                        name="chevron-left"
                        size={SIZES.h1}
                        color={COLORS.primary}
                        onPress={() => {
                            navigation.popToTop();
                        }}
                    />
                }
            />
            <ScrollView
                contentContainerStyle={styles.formContentContainer}
            >
                <Formik
                    initialValues={{ code: '', name: '', noLoan: false, skipped: false }}
                    validationSchema={schema}
                    onSubmit={values => { console.log(values) }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Code"
                                required={true}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                value={values.code}
                                touched={touched.code}
                                error={errors.code}
                            />

                            <CustomTextInput
                                label="Name"
                                required={true}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                touched={touched.name}
                                error={errors.name}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <View style={styles.rules}>
                                <Text style={styles.text_rules}>Rules</Text>

                                <CustomCheckbox
                                    label="No Loan"
                                    value={values.noLoan}
                                    onValueChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.noLoan);
                                        }

                                        setFieldValue('noLoan', newState);
                                    }}
                                />

                                <CustomCheckbox
                                    label="Skipped"
                                    value={values.skipped}
                                    onValueChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.skipped);
                                        }

                                        setFieldValue('skipped', newState);
                                    }}
                                />
                            </View>

                            <CustomButton
                                containerStyle={styles.container_submit}
                                buttonStyle={styles.submit}
                                titleStyle={styles.text_submit}
                                title="Submit"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default FormItemStatus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    formContentContainer: {
        flexGrow: 1,
        padding: 20
    },
    container_submit: {
        marginTop: 20
    },
    submit: {
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    text_submit: {
        ...FONTS.h3,
        color: COLORS.white
    },
    rules: {
        marginTop: 10
    },
    text_rules: {
        ...FONTS.body3,
        color: COLORS.lightGray
    }
})
