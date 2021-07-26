import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'

import { COLORS, FONTS } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import HeaderFilter from '../commons/HeaderFilter';

const FilterCollectionType = ({ onClose }) => {
    return (
        <>
            <HeaderFilter
                title="Filter Collection Type"
                onClose={onClose}
            />
            <View style={styles.content}>
                <Formik
                    initialValues={{ collection_type: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Collection Type"
                                onChangeText={handleChange('collection_type')}
                                onBlur={handleBlur('collection_type')}
                                value={values.collection_type}
                                touched={touched.collection_type}
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

export default FilterCollectionType

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
