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

        this.state = {
            languages: []
        }

        this.languageDropdown = React.createRef();
        this.timeUnitDropdown = React.createRef();
        this.timeUnitType = [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
        ];
    }

    async getLanguages() {
        let findLanguages = await CRUDService.findAll("mst-language", {
            take: 100,
            skip: 0,
            sort: "language_name,language_id",
        });
        if (findLanguages) {
            for (let index = 0; index < findLanguages.data.length; index++) {
                const element = findLanguages.data[index];
                findLanguages.data[index] = { label: element.language_name, value: element.language_id }
            }

            this.setState({ languages: findLanguages.data })
            this.languageDropdown.current.setItemsFromPC(findLanguages.data);
        }
    }

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/mst-frequency"}/${id}`);
        if (findOneById) {
            this.props.setValues({
                frequency: findOneById.frequency,
                language_prefix: findOneById.language_prefix,
                time_increment: findOneById.time_increment.toString(),
                time_unit: findOneById.time_unit,
            })
            this.languageDropdown.current.setValueFromPC(findOneById.language_prefix);
            this.timeUnitDropdown.current.setValueFromPC(findOneById.time_unit);
        }
    }

    componentDidMount() {
        this.getLanguages()

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
            this.languageDropdown.current.setValueFromPC(null);
            this.timeUnitDropdown.current.setValueFromPC(null);
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
                        label="Frequency"
                        required={true}
                        onChangeText={handleChange('frequency')}
                        onBlur={handleBlur('frequency')}
                        value={values.frequency}
                        touched={touched.frequency}
                        error={errors.frequency}
                    />

                    <CustomDropdown
                        required={true}
                        ref={this.languageDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Language"
                        itemsContainer={this.state.languages}
                        value={values.language_prefix}
                        onChange={(state) => {
                            setFieldValue('language_prefix', state);
                        }}
                        touched={touched.language_prefix}
                        error={errors.language_prefix}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    <CustomTextInput
                        keyboardType="numeric"
                        label="Time Increment"
                        required={true}
                        onChangeText={handleChange('time_increment')}
                        onBlur={handleBlur('time_increment')}
                        value={values.time_increment}
                        touched={touched.time_increment}
                        error={errors.time_increment}
                        containerStyle={{ marginTop: 24 }}
                    />

                    <CustomDropdown
                        required={true}
                        ref={this.timeUnitDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Time Unit"
                        itemsContainer={this.timeUnitType}
                        value={values.time_unit}
                        onChange={(state) => {
                            setFieldValue('time_unit', state);
                        }}
                        touched={touched.time_unit}
                        error={errors.time_unit}
                        zIndex={1000}
                        zIndexInverse={3000}
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
    frequency: yup.string().required("Frequency is required").max(25),
    language_prefix: yup.string().required("Language is required"),
    time_increment: yup.string().required("Time Increment is required").test(
        'Digits only',
        'Time increment should have digits only',
        (value) => /^\d+$/.test(value)
    ),
    time_unit: yup.string().required("Time Unit is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/mst-frequency", post);
    return created;
}

const updateOneById = async (id, post) => {
    const updated = await CRUDService.updateOneById("/mst-frequency", id, post);
    return updated;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ frequency: "", language_prefix: "", time_increment: "0", time_unit: "" })
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
        marginTop: 32
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
