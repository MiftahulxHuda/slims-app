import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik'
import * as yup from 'yup';

import { COLORS, FONTS, SIZES } from '../../constants'
import DetailHeader from '../commons/DetailHeader'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';

let schema = yup.object().shape({
    code: yup.string().required("Code is required"),
    language: yup.string().required("Language is required"),
});

const FormLabel = ({ route, navigation }) => {
    const { action } = route.params;

    let actionTitle = "";
    if(action == "add") {
        actionTitle = "Add";
    } else {
        actionTitle = "Edit";
    }
    
    return (
        <View style={styles.container}>
            <DetailHeader
                title={actionTitle + " Label"}
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
                    initialValues={{ name: '', description: '' }}
                    validationSchema={schema}
                    onSubmit={values => { console.log(values) }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Name"
                                required={true}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                touched={touched.name}
                                error={errors.name}
                            />


                            {/* File Attachment */}

                            <CustomTextInput
                                label="Description"
                                required={true}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                                touched={touched.description}
                                error={errors.description}
                                containerStyle={{ marginTop: 10 }}
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

export default FormLabel

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
