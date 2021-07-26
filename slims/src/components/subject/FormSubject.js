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
});

const FormSubject = ({ route, navigation }) => {
    const { action } = route.params;

    let actionTitle = "";
    if (action == "add") {
        actionTitle = "Add";
    } else {
        actionTitle = "Edit";
    }

    const itemsType = [
        { label: 'Topic', value: '1' },
        { label: 'Geographic', value: '2' },
        { label: 'Name', value: '3' },
    ];

    return (
        <View style={styles.container}>
            <DetailHeader
                title={actionTitle + " Subject"}
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
                    initialValues={{
                        subject: '',
                        classification_code: '',
                        type: itemsType[0].value,
                        authority_files: ''
                    }}
                    validationSchema={schema}
                    onSubmit={values => { console.log(values) }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Subject"
                                required={true}
                                onChangeText={handleChange('subject')}
                                onBlur={handleBlur('subject')}
                                value={values.subject}
                                touched={touched.subject}
                                error={errors.subject}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Classification Code"
                                onChangeText={handleChange('classification_code')}
                                onBlur={handleBlur('classification_code')}
                                value={values.classification_code}
                                touched={touched.classification_code}
                                error={errors.classification_code}
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

                            <CustomTextInput
                                label="Authority Files"
                                onChangeText={handleChange('authority_files')}
                                onBlur={handleBlur('authority_files')}
                                value={values.authority_files}
                                touched={touched.authority_files}
                                error={errors.authority_files}
                                containerStyle={{ marginTop: 20 }}
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

export default FormSubject

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
    }
})
