import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'

import { COLORS, FONTS, SIZES } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';

const FilterBibliography = ({ onClose }) => {
    return (
        <>
            <View style={styles.content}>
                <Formik
                    initialValues={{ title: '', topic: '', author: '', isbn_issn: '', publisher: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                        <>
                            <CustomTextInput
                                label="Title/Series Title"
                                placeholder="Title/Series Title"
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                                touched={touched.title}
                                containerInputStyle={{ backgroundColor: COLORS.white }}
                            />

                            <CustomTextInput
                                label="Topic"
                                placeholder="Topic"
                                onChangeText={handleChange('topic')}
                                onBlur={handleBlur('topic')}
                                value={values.topic}
                                touched={touched.topic}
                                containerStyle={{ marginTop: 10 }}
                                containerInputStyle={{ backgroundColor: COLORS.white }}
                            />

                            <CustomTextInput
                                label="Author"
                                placeholder="Author"
                                onChangeText={handleChange('author')}
                                onBlur={handleBlur('author')}
                                value={values.author}
                                touched={touched.author}
                                containerStyle={{ marginTop: 10 }}
                                containerInputStyle={{ backgroundColor: COLORS.white }}
                            />

                            <CustomTextInput
                                label="ISBN/ISSN"
                                placeholder="ISBN/ISSN"
                                onChangeText={handleChange('isbn_issn')}
                                onBlur={handleBlur('isbn_issn')}
                                value={values.isbn_issn}
                                touched={touched.isbn_issn}
                                containerStyle={{ marginTop: 10 }}
                                containerInputStyle={{ backgroundColor: COLORS.white }}
                            />

                            <CustomTextInput
                                label="Publisher"
                                placeholder="Publisher"
                                onChangeText={handleChange('publisher')}
                                onBlur={handleBlur('publisher')}
                                value={values.publisher}
                                touched={touched.publisher}
                                containerStyle={{ marginTop: 10 }}
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

export default FilterBibliography

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
