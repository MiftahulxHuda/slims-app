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
        const findOneById = await CRUDService.findOneById(`${"/mst-content-type"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                code: findOneById.code,
                code2: findOneById.code2,
                content_type: findOneById.content_type,
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
                        label="Code"
                        required={true}
                        onChangeText={handleChange('code')}
                        onBlur={handleBlur('code')}
                        value={values.code}
                        touched={touched.code}
                        error={errors.code}
                    />

                    <CustomTextInput
                        label="Code2"
                        onChangeText={handleChange('code2')}
                        onBlur={handleBlur('code2')}
                        value={values.code2}
                        touched={touched.code2}
                        error={errors.code2}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomTextInput
                        label="Content Type"
                        required={true}
                        onChangeText={handleChange('content_type')}
                        onBlur={handleBlur('content_type')}
                        value={values.content_type}
                        touched={touched.content_type}
                        error={errors.content_type}
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
    code: yup.string().required("Code is required").max(5),
    code2: yup.string().test('len', 'Code must be exactly 1 characters', val => {
        // if (!val) {
        //     return false;
        // }

        if (val) {
            console.log(val.length == 1)
            return val.length == 1
        }

        return true
    }),
    content_type: yup.string().required("Content Type is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-content-type", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-content-type", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ code: "", code2: "", content_type: "" })
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
