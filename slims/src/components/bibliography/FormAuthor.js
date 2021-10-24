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
import { addAuthorType, addAuthor, editAuthor } from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import CustomDropdown from '../commons/CustomDropdown';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.authorDropdown = React.createRef();
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
                    case 'mst-author':
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
            this.authorDropdown.current.setValueFromPC(null)
            this.levelTypeDropdown.current.setValueFromPC(null)
            this.props.resetFilter();
        }
    }

    getAuthorName() {
        if (this.props.values.author_id) {
            const item = this.props.form.authorType.filter(val => val.value == this.props.values.author_id)
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
                        ref={this.authorDropdown}
                        searchable={true}
                        disableLocalSearch={true}
                        label="Author"
                        itemsContainer={this.props.form.authorType}
                        value={values.author_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-author",
                                "author_name,author_id",
                                { author_name: this.getAuthorName() },
                                { label: 'author_name', value: 'author_id' },
                                (data) => {
                                    this.props.addAuthorType(data);
                                },
                                this.authorDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('author_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-author",
                                "author_name,author_id",
                                { author_name: text },
                                { label: 'author_name', value: 'author_id' },
                                (data) => {
                                    this.props.addAuthorType(data);
                                },
                                this.authorDropdown
                            );
                        }}
                        touched={touched.author_id}
                        error={errors.author_id}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    <TouchableOpacity onPress={() => this.props.navigation.push("FormAuthorMaster", { action: "add" })}>
                        <View style={{
                            flexDirection: 'row',
                            // justifyContent: 'flex-end',
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
                            }}>Add Author</Text>
                        </View>
                    </TouchableOpacity>

                    <CustomDropdown
                        required={true}
                        ref={this.levelTypeDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Level"
                        itemsContainer={this.props.form.levelType}
                        value={values.level}
                        onChange={(state) => {
                            setFieldValue('level', state);
                        }}
                        touched={touched.level}
                        error={errors.level}
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
    author_id: yup.string().required("Author is required"),
    level: yup.string().required("Level is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/biblio/biblio_author", post);
    return created;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ author_id: "", level: "" })
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

        let biblioAuthor = { ...values };

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
        const author_name = getItemFromItems(values.author_id, props.form.authorType);
        biblioAuthor['author_name'] = author_name;

        const level_name = getItemFromItems(values.level, props.form.levelType);
        biblioAuthor['level_name'] = level_name;

        if (props.route.params.mode == "add") {
            let findAuthor = props.form.author.find((item) => {
                return biblioAuthor.author_id == item.author_id;
            })
            
            if(findAuthor) {
                Message.showToast("Author is exist")
                props.setIsLoading();
                return;
            }

            props.addAuthor(biblioAuthor)
            props.setIsLoading();
            props.navigation.goBack();            
        } else {
            req = await create({
                biblio_id: props.route.params.biblio_id,
                author_id: values.author_id,
                level: values.level
            })
            messageToast = "Data added";
            if (req) {
                props.addAuthor(biblioAuthor)
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
            addAuthorType,
            addAuthor,
            editAuthor,
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
