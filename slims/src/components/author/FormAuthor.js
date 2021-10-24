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
import CustomDropdown from '../commons/CustomDropdown';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.authorityTypeDropdown = React.createRef();
        this.itemsType = [
            { label: 'Personal Name', value: 'p' },
            { label: 'Organizational Body', value: 'o' },
            { label: 'Conference', value: 'c' },
        ];
    }

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/mst-author"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                author_name: findOneById.author_name,
                author_year: findOneById.author_year,
                authority_type: findOneById.authority_type,
                auth_list: findOneById.auth_list,
            })
            this.authorityTypeDropdown.current.setValueFromPC(findOneById.authority_type);
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
                        label="Author"
                        required={true}
                        onChangeText={handleChange('author_name')}
                        onBlur={handleBlur('author_name')}
                        value={values.author_name}
                        touched={touched.author_name}
                        error={errors.author_name}
                    />

                    <CustomTextInput
                        label="Author Year"
                        onChangeText={handleChange('author_year')}
                        onBlur={handleBlur('author_year')}
                        value={values.author_year}
                        touched={touched.author_year}
                        error={errors.author_year}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDropdown
                        required={true}
                        ref={this.authorityTypeDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Authority Type"
                        itemsContainer={this.itemsType}
                        value={values.authority_type}
                        onChange={(state) => {
                            setFieldValue('authority_type', state);
                        }}
                        touched={touched.authority_type}
                        error={errors.authority_type}
                    />

                    <CustomTextInput
                        label="Authority Files"
                        onChangeText={handleChange('auth_list')}
                        onBlur={handleBlur('auth_list')}
                        value={values.auth_list}
                        touched={touched.auth_list}
                        error={errors.auth_list}
                        containerStyle={{ marginTop: 24 }}
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
    author_name: yup.string().required("Author is required").max(100),
    authority_type: yup.string().required("Authority Type is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-author", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-author", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({
            author_name: "",
            author_year: "",
            authority_type: "",
            auth_list: "",
        })
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
