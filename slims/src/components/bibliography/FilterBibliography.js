import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { withFormik } from 'formik'
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.setValues(this.props.filter)
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.props.isReset == true) {
            return this.props.isReset;
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot != null) {
            this.props.resetForm({ values: '' });
            this.props.resetFilter();
        }
    }

    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;

        return (
            <View style={styles.content}>
                <CustomTextInput
                    label="Title"
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    touched={touched.title}
                    containerInputStyle={{ backgroundColor: COLORS.lightGray2 }}
                />

                <CustomTextInput
                    label="Authors"
                    onChangeText={handleChange('author')}
                    onBlur={handleBlur('author')}
                    value={values.author}
                    touched={touched.author}
                    containerInputStyle={{ backgroundColor: COLORS.lightGray2 }}
                    containerStyle={{ marginTop: 12 }}
                />

                <CustomTextInput
                    label="ISSBN/ISSN"
                    onChangeText={handleChange('isbn_issn')}
                    onBlur={handleBlur('isbn_issn')}
                    value={values.isbn_issn}
                    touched={touched.isbn_issn}
                    containerInputStyle={{ backgroundColor: COLORS.lightGray2 }}
                    containerStyle={{ marginTop: 12 }}
                />

                <CustomTextInput
                    label="Publisher"
                    onChangeText={handleChange('publisher')}
                    onBlur={handleBlur('publisher')}
                    value={values.publisher}
                    touched={touched.publisher}
                    containerInputStyle={{ backgroundColor: COLORS.lightGray2 }}
                    containerStyle={{ marginTop: 12 }}
                />

                <CustomButton
                    containerStyle={styles.container_submit}
                    buttonStyle={styles.submit}
                    titleStyle={styles.text_submit}
                    title="Filter"
                    onPress={handleSubmit}
                />
            </View>
        )
    }
}

export default formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({
            title: "",
            author: "",
            isbn_issn: "",
            publisher: "",
        })
    },
    enableReinitialize: true,
    // Custom sync validation
    // validate: values => {
    //     const errors = {};

    //     if (!values.name) {
    //         errors.name = 'Required';
    //     }

    //     return errors;
    // },

    handleSubmit: (values, { props }) => {
        props.setInitialValues(values);
        props.navigation.goBack();
    },

    // displayName: 'BasicForm',
})(MyForm);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    container_submit: {
        marginTop: 24
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
