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
import CustomCheckbox from '../commons/CustomCheckbox';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)
    }

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/mst-item-status"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                item_status_id: findOneById.item_status_id,
                item_status_name: findOneById.item_status_name,
                no_loan: findOneById.no_loan ? true : false,
                skip_stock_take: findOneById.skip_stock_take ? true : false,
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
            setFieldValue
        } = this.props;

        return (
            <>
                <View style={styles.content}>
                    <CustomTextInput
                        label="Code"
                        required={true}
                        onChangeText={handleChange('item_status_id')}
                        onBlur={handleBlur('item_status_id')}
                        value={values.item_status_id}
                        touched={touched.item_status_id}
                        error={errors.item_status_id}
                    />

                    <CustomTextInput
                        label="Item Status"
                        required={true}
                        onChangeText={handleChange('item_status_name')}
                        onBlur={handleBlur('item_status_name')}
                        value={values.item_status_name}
                        touched={touched.item_status_name}
                        error={errors.item_status_name}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <View style={styles.rules}>
                        <Text style={styles.text_rules}>Rules</Text>

                        <CustomCheckbox
                            label="No Loan Transaction"
                            value={values.no_loan}
                            onValueChange={(state) => {
                                let newState = state;

                                if (typeof state === "function") {
                                    newState = state(values.no_loan);
                                }

                                setFieldValue('no_loan', newState);
                            }}
                        />

                        <CustomCheckbox
                            label="Skipped By Stock Take"
                            value={values.skip_stock_take}
                            onValueChange={(state) => {
                                let newState = state;

                                if (typeof state === "function") {
                                    newState = state(values.skip_stock_take);
                                }

                                setFieldValue('skip_stock_take', newState);
                            }}
                        />
                    </View>

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
    item_status_id: yup.string().required("Code is required").max(3, 'Code must be at most 3 characters'),
    item_status_name: yup.string().required("Item Status is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-item-status", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-item-status", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ item_status_id: "", item_status_name: "", no_loan: false, skip_stock_take: false })
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
        let post = {...values};
        post['no_loan'] = post['no_loan'] ? 1 : 0;
        post['skip_stock_take'] = post['skip_stock_take'] ? 1 : 0;
        
        props.setIsLoading();

        let req;
        let messageToast;
        if (props.route.params.action == "add") {
            req = await create(values)
            messageToast = "Data added";
        } else {
            req = await updateOneById(props.route.params.id, post);
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
    },
    rules: {
        marginTop: 12
    },
    text_rules: {
        ...FONTS.body3,
        color: COLORS.gray3
    }
})
