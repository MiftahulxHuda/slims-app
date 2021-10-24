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

        this.topicTypeDropdown = React.createRef();
        this.topicType = [
            { label: 'Topic', value: 't' },
            { label: 'Geographic', value: 'g' },
            { label: 'Name', value: 'n' },
            { label: 'Temporal', value: 'tm' },
            { label: 'Genre', value: 'gr' },
            { label: 'Occupation', value: 'oc' },
        ];
    }

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/mst-topic"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                topic: findOneById.topic,
                topic_type: findOneById.topic_type,
                auth_list: findOneById.auth_list,
            })
            this.topicTypeDropdown.current.setValueFromPC(findOneById.topic_type);
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
                        label="Topic"
                        required={true}
                        onChangeText={handleChange('topic')}
                        onBlur={handleBlur('topic')}
                        value={values.topic}
                        touched={touched.topic}
                        error={errors.topic}
                    />

                    <CustomDropdown
                        required={true}
                        ref={this.topicTypeDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Topic Type"
                        itemsContainer={this.topicType}
                        value={values.topic_type}
                        onChange={(state) => {
                            setFieldValue('topic_type', state);
                        }}
                        touched={touched.topic_type}
                        error={errors.topic_type}
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
    topic: yup.string().required("Topic is required").max(100),
    topic_type: yup.string().required("Topic Type is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-topic", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-topic", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({
            topic: "",
            topic_type: "",
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
