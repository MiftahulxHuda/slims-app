import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'

import { COLORS, FONTS, SIZES } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomDropdown from '../commons/CustomDropdown';
import CustomButton from '../commons/CustomButton';

const AddSuject = () => {
    const nameType = [
        { label: 'Text', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const oneType = [
        { label: 'Personal Name', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const twoType = [
        { label: 'Primary Author', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    return (
        <>
            <View style={styles.content}>
                <Formik
                    initialValues={{
                        subject: nameType[0].value,
                        type_one: oneType[0].value,
                        type_two: twoType[0].value
                    }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                        <>
                            <CustomDropdown
                                label="Subject"
                                itemsContainer={nameType}
                                value={values.subject}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.subject);
                                    }

                                    setFieldValue('subject', newState);
                                }}
                                touched={touched.subject}
                                error={errors.subject}
                                zIndex={3000}
                                zIndexInverse={1000}
                                backgroundColor={COLORS.white}
                            />

                            <CustomDropdown
                                containerStyle={{ marginTop: 20 }}
                                label="Type1"
                                itemsContainer={oneType}
                                value={values.type_one}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.type_one);
                                    }

                                    setFieldValue('type_one', newState);
                                }}
                                touched={touched.type_one}
                                error={errors.type_one}
                                zIndex={2000}
                                zIndexInverse={2000}
                                backgroundColor={COLORS.white}
                            />

                            <CustomDropdown
                                containerStyle={{ marginTop: 20 }}
                                label="Type2"
                                itemsContainer={twoType}
                                value={values.type_two}
                                onChange={(state) => {
                                    let newState = state;

                                    if (typeof state === "function") {
                                        newState = state(values.type_two);
                                    }

                                    setFieldValue('type_two', newState);
                                }}
                                touched={touched.type_two}
                                error={errors.type_two}
                                zIndex={1000}
                                zIndexInverse={3000}
                                backgroundColor={COLORS.white}
                            />

                            <CustomButton
                                containerStyle={styles.container_submit}
                                buttonStyle={styles.submit}
                                titleStyle={styles.text_submit}
                                title="Filter"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </>
    )
}

export default AddSuject

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
        padding: 15
    },
    container_submit: {
        marginTop: 30,
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
