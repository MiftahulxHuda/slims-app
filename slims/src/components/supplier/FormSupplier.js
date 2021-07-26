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
    name: yup.string().required("Name is required"),
});

const FormSupplier = ({ route, navigation }) => {
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
                title={actionTitle + " Supplier"}
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
                        name: '',
                        address: '',
                        contact: '',
                        phone_number: '',
                        fax_number: '',
                        account_number: '',
                    }}
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
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Address"
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                touched={touched.address}
                                error={errors.address}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Contact"
                                onChangeText={handleChange('contact')}
                                onBlur={handleBlur('contact')}
                                value={values.contact}
                                touched={touched.contact}
                                error={errors.contact}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Phone Number"
                                onChangeText={handleChange('phone_number')}
                                onBlur={handleBlur('phone_number')}
                                value={values.phone_number}
                                touched={touched.phone_number}
                                error={errors.phone_number}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Fax Number"
                                onChangeText={handleChange('fax_number')}
                                onBlur={handleBlur('fax_number')}
                                value={values.fax_number}
                                touched={touched.fax_number}
                                error={errors.fax_number}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <CustomTextInput
                                label="Account Number"
                                onChangeText={handleChange('account_number')}
                                onBlur={handleBlur('account_number')}
                                value={values.account_number}
                                touched={touched.account_number}
                                error={errors.account_number}
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

export default FormSupplier

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
