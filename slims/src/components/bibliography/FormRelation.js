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
import { addBiblioType, addRelation } from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import CustomDropdown from '../commons/CustomDropdown';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.biblioDropdown = React.createRef();

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
            this.biblioDropdown.current.setValueFromPC(null)
            this.props.resetFilter();
        }
    }

    getBiblioName() {
        if (this.props.values.rel_biblio_id) {
            const item = this.props.form.biblioType.filter(val => val.value == this.props.values.rel_biblio_id)
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
                        ref={this.biblioDropdown}
                        searchable={true}
                        disableLocalSearch={true}
                        label="Relation Biblio"
                        itemsContainer={this.props.form.biblioType}
                        value={values.rel_biblio_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "biblio",
                                "title,biblio_id",
                                { title: this.getBiblioName() },
                                { label: 'title', value: 'biblio_id' },
                                (data) => {
                                    this.props.addBiblioType(data);
                                },
                                this.biblioDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('rel_biblio_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "biblio",
                                "title,biblio_id",
                                { title: text },
                                { label: 'title', value: 'biblio_id' },
                                (data) => {
                                    this.props.addBiblioType(data);
                                },
                                this.biblioDropdown
                            );
                        }}
                        touched={touched.rel_biblio_id}
                        error={errors.rel_biblio_id}
                        zIndex={3000}
                        zIndexInverse={1000}
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
    rel_biblio_id: yup.string().required("Relation Biblio is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/biblio/biblio_relation", post);
    return created;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({ rel_biblio_id: "" })
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

        let biblioRelation = { ...values };

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
        const title = getItemFromItems(values.rel_biblio_id, props.form.biblioType);
        biblioRelation['title'] = title;

        if (props.route.params.mode == "add") {
            let findRelation = props.form.relation.find((item) => {
                return values.biblio_id == item.biblio_id;
            })
            
            if(findRelation) {
                Message.showToast("Relation Biblio is exist")
                props.setIsLoading();
                return;
            }
            
            props.addRelation(biblioRelation)
            props.setIsLoading();
            props.navigation.goBack();
        } else {
            req = await create({
                biblio_id: props.route.params.biblio_id,
                rel_biblio_id: values.rel_biblio_id
            })
            messageToast = "Data added";
            if (req) {
                props.addRelation(biblioRelation)
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
            addBiblioType,
            addRelation,
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
