import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { withFormik } from 'formik'
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import { setIsLoading } from '../../store/slice/loadingSlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)
    }

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/mst-publisher"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                publisher_name: findOneById.publisher_name,
            })
        }
    }

    componentDidMount() {
        if (this.props.route.params.action == "edit") {
            this.findOneById(this.props.route.params.id)
        }
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
            <>
                <View style={styles.content}>
                    <CustomTextInput
                        label="Publisher"
                        required={true}
                        onChangeText={handleChange('publisher_name')}
                        onBlur={handleBlur('publisher_name')}
                        value={values.publisher_name}
                        touched={touched.publisher_name}
                        error={errors.publisher_name}
                    />

                    <CustomButton
                        containerStyle={styles.container_submit}
                        buttonStyle={styles.submit}
                        titleStyle={styles.text_submit}
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </View>
            </>
        )
    }
}

const schema = yup.object().shape({
    publisher_name: yup.string().required("Publisher is required").max(100),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-publisher", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-publisher", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ publisher_name: "" })
    },
    validationSchema: schema,
    // enableReinitialize: true,
    // Custom sync validation
    // validate: values => {
    //     const errors = {};

    //     if (!values.name) {
    //         errors.name = 'Required';
    //     }

    //     return errors;
    // },

    handleSubmit: async (values, { props }) => {
        props.setIsLoading();

        let req;
        let messageToast;
        if (props.route.params.action == "add") {
            req = await create(values)
            messageToast = "Data added";
        } else {
            req = await updateOneById(props.route.params.id, values);
            messageToast = "Data updated";
        }

        if (req) {
            props.setIsLoading();
            Message.showToast(messageToast)
            props.navigation.goBack();
        } else {
            props.setIsLoading();
        }
    },

    // displayName: 'BasicForm',
})(MyForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setIsLoading
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(formikEnhancer)

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: COLORS.white,
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
