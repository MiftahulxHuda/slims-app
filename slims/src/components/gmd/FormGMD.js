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
        const findOneById = await CRUDService.findOneById(`${"/mst-gmd"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                gmd_code: findOneById.gmd_code,
                gmd_name: findOneById.gmd_name,
            })
        }
    }

    componentDidMount() {
        if (this.props.route.params.action == "edit") {
            this.findOneById(this.props.route.params.gmd_id)
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
                        label="Code"
                        required={true}
                        onChangeText={handleChange('gmd_code')}
                        onBlur={handleBlur('gmd_code')}
                        value={values.gmd_code}
                        touched={touched.gmd_code}
                        error={errors.gmd_code}
                    />

                    <CustomTextInput
                        label="Name"
                        required={true}
                        onChangeText={handleChange('gmd_name')}
                        onBlur={handleBlur('gmd_name')}
                        value={values.gmd_name}
                        touched={touched.gmd_name}
                        error={errors.gmd_name}
                        containerStyle={{ marginTop: 12 }}
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
    gmd_code: yup.string().required("Code is required")
        .test('len', 'Code must be at most 3 characters', val => {
            if (!val) {
                return false;
            }
            return val.length <= 3
        }),
    gmd_name: yup.string().required("Name is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-gmd", post);
    return created;
}

const updateOneById = async (gmd_id, post) => {
    const updated = await CRUDService.updateOneById("/mst-gmd", gmd_id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ gmd_code: "", gmd_name: "" })
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
            req = await updateOneById(props.route.params.gmd_id, values);
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
