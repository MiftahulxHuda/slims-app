import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik'
import * as yup from 'yup';

import { COLORS, FONTS, SIZES } from '../../constants'
import DetailHeader from '../commons/DetailHeader'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import CustomDropdown from '../commons/CustomDropdown';

let schema = yup.object().shape({
    code: yup.string().required("Code is required"),
    language: yup.string().required("Language is required"),
});

const FormFrequency = ({ route, navigation }) => {
    const { action } = route.params;

    let actionTitle = "";
    if (action == "add") {
        actionTitle = "Add";
    } else {
        actionTitle = "Edit";
    }

    const languagesType = [
        { label: 'Indonesia', value: '1' },
        { label: 'English', value: '2' },
    ];

    const timeUnitType = [
        { label: 'Day', value: '1' },
        { label: 'Week', value: '2' },
        { label: 'Month', value: '3' },
    ];

    return (
        <View style={styles.container}>
            <DetailHeader
                title={actionTitle + " Frequency"}
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
                    initialValues={{ frequency: '', language: '', time_increment: '', time_unit: '' }}
                    validationSchema={schema}
                    onSubmit={values => { console.log(values) }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Frequency"
                                required={true}
                                onChangeText={handleChange('frequency')}
                                onBlur={handleBlur('frequency')}
                                value={values.frequency}
                                touched={touched.frequency}
                                error={errors.frequency}
                            />

                            <CustomDropdown
                                containerStyle={{ marginTop: 10 }}
                                label="Language"
                                itemsContainer={languagesType}
                                value={values.language}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.language);
                                    }

                                    setFieldValue('language', newState);
                                }}
                                touched={touched.language}
                                error={errors.language}
                            />

                            <CustomTextInput
                                label="Time Increment"
                                required={true}
                                onChangeText={handleChange('time_increment')}
                                onBlur={handleBlur('time_increment')}
                                value={values.time_increment}
                                touched={touched.time_increment}
                                error={errors.time_increment}
                                containerStyle={{ marginTop: 20 }}
                            />

                            <CustomDropdown
                                containerStyle={{ marginTop: 10 }}
                                label="Time Unit"
                                itemsContainer={timeUnitType}
                                value={values.time_unit}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.time_unit);
                                    }

                                    setFieldValue('time_unit', newState);
                                }}
                                touched={touched.time_unit}
                                error={errors.time_unit}
                            />

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

export default FormFrequency

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
        marginTop: 30
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
    }
})
