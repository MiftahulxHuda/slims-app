import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'

import { COLORS, FONTS } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import HeaderFilter from '../commons/HeaderFilter';

const FilterItemStatus = ({ onClose }) => {
    return (
        <>
            <HeaderFilter
                title="Filter Item Status"
                onClose={onClose}
            />
            <View style={styles.content}>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                touched={touched.name}
                                containerInputStyle={{ backgroundColor: COLORS.white }}
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

export default FilterItemStatus

const styles = StyleSheet.create({
    container: {
        height: 450
    },
    content: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
        padding: 15
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
