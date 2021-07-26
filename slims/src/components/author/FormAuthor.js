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
    name: yup.string().required("Name is required"),
    type: yup.string().required("Type is required"),
});

const FormAuthor = ({ route, navigation }) => {
    const { action } = route.params;

    let actionTitle = "";
    if (action == "add") {
        actionTitle = "Add";
    } else {
        actionTitle = "Edit";
    }

    const itemsType = [
        { label: 'Personal Name', value: '1' },
        { label: 'Organizational Body', value: '2' },
        { label: 'Conference', value: '3' },
    ];

    return (
        <View style={styles.container}>
            <DetailHeader
                title={actionTitle + " Author"}
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
                    initialValues={{ name: '', birth_year: '', type: itemsType[0].value }}
                    validationSchema={schema}
                    onSubmit={values => { console.log(values) }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                        <>
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

                            <CustomTextInput
                                label="Birth Year"
                                onChangeText={handleChange('birth_year')}
                                onBlur={handleBlur('birth_year')}
                                value={values.birth_year}
                                touched={touched.birth_year}
                                error={errors.birth_year}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomDropdown
                                containerStyle={{ marginTop: 10 }}
                                label="Type"
                                itemsContainer={itemsType}
                                value={values.type}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.type);
                                    }

                                    setFieldValue('type', newState);
                                }}
                                touched={touched.type}
                                error={errors.type}
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

export default FormAuthor

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
