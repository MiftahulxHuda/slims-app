import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withFormik } from 'formik'
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import { setIsLoading } from '../../store/slice/loadingSlice';
import { addTopicType, addTopic, editTopic } from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import CustomDropdown from '../commons/CustomDropdown';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.topicDropdown = React.createRef();
        this.levelTypeDropdown = React.createRef();

        this.onChangeType = this.onChangeType.bind(this);
    }

    onChangeType(url, sort, filter, keyItem, addType, typeDropDown) {
        // console.log(url, sort, filter, addType, typeDropDown)
        CRUDService.findAll(url, {
            take: 10,
            skip: 0,
            sort: sort,
            ...filter
        })
            .then((result) => {
                for (let index = 0; index < result.data.length; index++) {
                    const element = result.data[index];
                    result.data[index] = { label: element[keyItem.label], value: element[keyItem.value] }
                }

                switch (url) {
                    case 'mst-topic':
                        result.data.unshift({ label: 'Not Set', value: '' });
                        break;

                    default:
                        break;
                }

                addType(result.data)
                typeDropDown.current.setItemsFromPC(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                typeDropDown.current.setLoading();
            });
    }

    componentDidMount() {
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
            this.topicDropdown.current.setValueFromPC(null)
            this.levelTypeDropdown.current.setValueFromPC(null)
            this.props.resetFilter();
        }
    }

    getTopicName() {
        if (this.props.values.topic_id) {
            const item = this.props.form.topicType.filter(val => val.value == this.props.values.topic_id)
            return item[0].label;
        } else {
            return '';
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
                    <CustomDropdown
                        required={true}
                        ref={this.topicDropdown}
                        searchable={true}
                        disableLocalSearch={true}
                        label="Topic"
                        itemsContainer={this.props.form.topicType}
                        value={values.topic_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-topic",
                                "topic,topic_id",
                                { topic: this.getTopicName() },
                                { label: 'topic', value: 'topic_id' },
                                (data) => {
                                    this.props.addTopicType(data);
                                },
                                this.topicDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('topic_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-topic",
                                "topic,topic_id",
                                { topic: text },
                                { label: 'topic', value: 'topic_id' },
                                (data) => {
                                    this.props.addTopicType(data);
                                },
                                this.topicDropdown
                            );
                        }}
                        touched={touched.topic_id}
                        error={errors.topic_id}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.push("FormSubjectMaster", { action: "add" })}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 12
                        }}>
                            <Icon
                                name="plus-circle"
                                size={SIZES.h4}
                                color={COLORS.primary}
                            />
                            <Text style={{
                                ...FONTS.h4,
                                color: COLORS.primary,
                                marginLeft: 8
                            }}>Add Subject</Text>
                        </View>
                    </TouchableOpacity>

                    <CustomDropdown
                        required={true}
                        ref={this.levelTypeDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Level"
                        itemsContainer={this.props.form.levelTopicType}
                        value={values.level}
                        onChange={(state) => {
                            setFieldValue('level', state);
                        }}
                        touched={touched.level}
                        error={errors.level}
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
    topic_id: yup.string().required("Topic is required"),
    level: yup.string().required("Level is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/biblio/biblio_topic", post);
    return created;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ topic_id: "", level: "" })
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

        let biblioTopic = { ...values };

        const getItemFromItems = (key, list) => {
            let item;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element.value == key) {
                    item = { ...element };
                }
            }

            return item?.label;
        }
        const topic_name = getItemFromItems(values.topic_id, props.form.topicType);
        biblioTopic['topic_name'] = topic_name;

        const level_name = getItemFromItems(values.level, props.form.levelType);
        biblioTopic['level_name'] = level_name;

        let req;
        let messageToast;
        if (props.route.params.mode == "add") {
            let findTopic = props.form.topic.find((item) => {
                return biblioTopic.biblio_id == item.biblio_id;
            })

            if (findTopic) {
                Message.showToast("Topic is exist")
                props.setIsLoading();
                return;
            }

            props.addTopic(biblioTopic)
            props.setIsLoading();
            props.navigation.goBack();
        } else {
            req = await create({
                biblio_id: props.route.params.biblio_id,
                topic_id: values.topic_id,
                level: values.level
            })
            messageToast = "Data added";
            if (req) {
                props.addTopic(biblioTopic)
                props.setIsLoading();
                Message.showToast(messageToast)
                props.navigation.goBack();
            } else {
                props.setIsLoading();
            }
        }
    },

    // displayName: 'BasicForm',
})(MyForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setIsLoading,
            addTopicType,
            addTopic,
            editTopic,
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
