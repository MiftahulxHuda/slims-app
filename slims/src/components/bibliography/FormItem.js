import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { withFormik } from 'formik'
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { COLORS, FONTS } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import { setIsLoading } from '../../store/slice/loadingSlice';
import {
    addItem,
    editItem,
    addLocationType,
    addCollTypeType,
    addItemStatusType,
    addSupplierType
} from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import CustomDropdown from '../commons/CustomDropdown';
import CustomRadioButton from '../commons/CustomRadioButton';
import CustomDateTimePicker from '../commons/CustomDateTimePicker';
import { contextType } from 'react-native/Libraries/Image/ImageBackground';

const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let date = dd + '/' + mm + '/' + yyyy;
    return date;
}

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.locationTypeDropdown = React.createRef();
        this.collTypeTypeDropdown = React.createRef();
        this.itemStatusTypeDropdown = React.createRef();
        this.supplierTypeDropdown = React.createRef();
        this.priceCurrencyTypeDropdown = React.createRef();

        this.onChangeType = this.onChangeType.bind(this);
        this.source = [
            { label: 'Buy', value: 0 },
            { label: 'Prize/Grant', value: 1 }
        ];
    }

    async findOne(data) {
        this.props.setValues({
            item_id: data.item_id,
            item_code: data.item_code,
            // call_number: data.call_number,
            inventory_code: data.inventory_code,
            location_id: data.location_id,
            shelf_location: data.shelf_location,
            coll_type_id: data.coll_type_id,
            item_status_id: data.item_status_id,
            order_number: data.order_number,
            order_date: data.order_date,
            received_date: data.received_date,
            supplier_id: data.supplier_id,
            source: data.source - 1,
            invoice: data.invoice,
            invoice_date: data.invoice_date,
            price: data.price.toString(),
            price_currency: data.price_currency,
        })

        this.onChangeType(
            "mst-location",
            "location_name,location_id",
            { location_name: data.location_name },
            { label: 'location_name', value: 'location_id' },
            (data) => {
                this.props.addLocationType(data);
            },
            this.locationTypeDropdown
        );
        this.locationTypeDropdown.current.setValueFromPC(data.location_id);

        this.onChangeType(
            "mst-coll-type",
            "coll_type_name,coll_type_id",
            { coll_type_name: data.coll_type_name },
            { label: 'coll_type_name', value: 'coll_type_id' },
            (data) => {
                this.props.addCollTypeType(data);
            },
            this.collTypeTypeDropdown
        );
        this.collTypeTypeDropdown.current.setValueFromPC(data.coll_type_id);

        this.onChangeType(
            "mst-item-status",
            "item_status_name,item_status_id",
            { item_status_name: data.item_status_name },
            { label: 'item_status_name', value: 'item_status_id' },
            (data) => {
                this.props.addItemStatusType(data);
            },
            this.itemStatusTypeDropdown
        );
        this.itemStatusTypeDropdown.current.setValueFromPC(data.item_status_id);

        this.onChangeType(
            "mst-supplier",
            "supplier_name,supplier_id",
            { supplier_name: data.supplier_name },
            { label: 'supplier_name', value: 'supplier_id' },
            (data) => {
                this.props.addSupplierType(data);
            },
            this.supplierTypeDropdown
        );
        this.supplierTypeDropdown.current.setValueFromPC(data.supplier_id);

        this.priceCurrencyTypeDropdown.current.setValueFromPC(data.price_currency ? data.price_currency : '');
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
                    case 'mst-location':
                        result.data.unshift({ label: 'Not Set', value: '' });
                        break;

                    case 'mst-item-status':
                        result.data.unshift({ label: 'Available', value: '' });
                        break;

                    case 'mst-supplier':
                        result.data.unshift({ label: 'Not Applicable', value: '' });
                        break;

                    case 'mst-coll-type':
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
        if (this.props.route.params.action == "edit") {

            this.findOne(this.props.route.params.data)

            return;
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
            this.props.resetForm({ values: '' })

            this.locationTypeDropdown.current.setValueFromPC(null)
            this.collTypeTypeDropdown.current.setValueFromPC(null)
            this.itemStatusTypeDropdown.current.setValueFromPC('0')
            this.supplierTypeDropdown.current.setValueFromPC('0')
            this.priceCurrencyTypeDropdown.current.setValueFromPC('')

            this.props.resetFilter();
        }
    }

    getLocationName() {
        if (this.props.values.location_id) {
            const item = this.props.form.locationType.filter(val => val.value == this.props.values.location_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getCollTypeName() {
        if (this.props.values.coll_type_id) {
            const item = this.props.form.collTypeType.filter(val => val.value == this.props.values.coll_type_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getItemStatusName() {
        if (this.props.values.item_status_id) {
            const item = this.props.form.itemStatusType.filter(val => val.value == this.props.values.item_status_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getSupplierName() {
        if (this.props.values.supplier_id) {
            const item = this.props.form.supplierType.filter(val => val.value == this.props.values.supplier_id)
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
            setFieldValue,
            setFieldError
        } = this.props;

        return (
            <>
                <ScrollView contentContainerStyle={styles.content}>
                    <CustomTextInput
                        required={true}
                        label="Item Code"
                        // onChangeText={(text) => {
                        //     if(text) {
                        //         this.getItemCode(text);
                        //     }

                        //     setFieldValue('item_code', text)
                        // }}
                        onChangeText={handleChange('item_code')}
                        onBlur={handleBlur('item_code')}
                        value={values.item_code}
                        touched={touched.item_code}
                        error={errors.item_code}
                    />

                    {/* <CustomTextInput
                        label="Call Number"
                        onChangeText={handleChange('call_number')}
                        onBlur={handleBlur('call_number')}
                        value={values.call_number}
                        touched={touched.call_number}
                        error={errors.call_number}
                        containerStyle={{ marginTop: 12 }}
                    /> */}

                    <CustomTextInput
                        label="Invetory Code"
                        onChangeText={handleChange('inventory_code')}
                        onBlur={handleBlur('inventory_code')}
                        value={values.inventory_code}
                        touched={touched.inventory_code}
                        error={errors.inventory_code}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDropdown
                        ref={this.locationTypeDropdown}
                        required={true}
                        searchable={true}
                        disableLocalSearch={true}
                        containerStyle={{ marginTop: 12 }}
                        label="Location"
                        itemsContainer={this.props.form.locationType}
                        value={values.location_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-location",
                                "location_name,location_id",
                                { location_name: this.getLocationName() },
                                { label: 'location_name', value: 'location_id' },
                                (data) => {
                                    this.props.addLocationType(data);
                                },
                                this.locationTypeDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('location_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-location",
                                "location_name,location_id",
                                { location_name: text },
                                { label: 'location_name', value: 'location_id' },
                                (data) => {
                                    this.props.addLocationType(data);
                                },
                                this.locationTypeDropdown
                            );
                        }}
                        touched={touched.location_id}
                        error={errors.location_id}
                    />

                    <CustomTextInput
                        label="Shelf Location"
                        onChangeText={handleChange('shelf_location')}
                        onBlur={handleBlur('shelf_location')}
                        value={values.shelf_location}
                        touched={touched.shelf_location}
                        error={errors.shelf_location}
                        containerStyle={{ marginTop: 24 }}
                    />

                    <CustomDropdown
                        ref={this.collTypeTypeDropdown}
                        required={true}
                        searchable={true}
                        disableLocalSearch={true}
                        containerStyle={{ marginTop: 12 }}
                        label="Collection Type"
                        itemsContainer={this.props.form.collTypeType}
                        value={values.coll_type_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-coll-type",
                                "coll_type_name,coll_type_id",
                                { coll_type_name: this.getCollTypeName() },
                                { label: 'coll_type_name', value: 'coll_type_id' },
                                (data) => {
                                    this.props.addCollTypeType(data);
                                },
                                this.collTypeTypeDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('coll_type_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-coll-type",
                                "coll_type_name,coll_type_id",
                                { coll_type_name: text },
                                { label: 'coll_type_name', value: 'coll_type_id' },
                                (data) => {
                                    this.props.addCollTypeType(data);
                                },
                                this.collTypeTypeDropdown
                            );
                        }}
                        touched={touched.coll_type_id}
                        error={errors.coll_type_id}
                    />

                    <CustomDropdown
                        ref={this.itemStatusTypeDropdown}
                        searchable={true}
                        disableLocalSearch={true}
                        containerStyle={{ marginTop: 24 }}
                        label="Item Status"
                        itemsContainer={this.props.form.itemStatusType}
                        value={values.item_status_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-item-status",
                                "item_status_name,item_status_id",
                                { item_status_name: this.getItemStatusName() },
                                { label: 'item_status_name', value: 'item_status_id' },
                                (data) => {
                                    this.props.addItemStatusType(data);
                                },
                                this.itemStatusTypeDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('item_status_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-item-status",
                                "item_status_name,item_status_id",
                                { item_status_name: text },
                                { label: 'item_status_name', value: 'item_status_id' },
                                (data) => {
                                    this.props.addItemStatusType(data);
                                },
                                this.itemStatusTypeDropdown
                            );
                        }}
                        touched={touched.item_status_id}
                        error={errors.item_status_id}
                    />

                    <View style={styles.field}>
                        <Text style={styles.text_field}>Source</Text>

                        <CustomRadioButton
                            containerStyle={{ marginTop: 8 }}
                            radioProps={this.source}
                            value={values.source}
                            onChange={(state) => {
                                setFieldValue('source', state);
                            }}
                        />
                    </View>

                    <CustomTextInput
                        label="Order Number"
                        onChangeText={handleChange('order_number')}
                        onBlur={handleBlur('order_number')}
                        value={values.order_number}
                        touched={touched.order_number}
                        error={errors.order_number}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDateTimePicker
                        label="Order Date"
                        value={values.order_date}
                        onChange={(state) => {
                            setFieldValue('order_date', state)
                        }}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDateTimePicker
                        label="Receiving Date"
                        value={values.received_date}
                        onChange={(state) => {
                            setFieldValue('received_date', state)
                        }}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDropdown
                        ref={this.supplierTypeDropdown}
                        searchable={true}
                        disableLocalSearch={true}
                        containerStyle={{ marginTop: 12 }}
                        label="Supplier"
                        itemsContainer={this.props.form.supplierType}
                        value={values.supplier_id}
                        onOpen={(state) => {
                            this.onChangeType(
                                "mst-supplier",
                                "supplier_name,supplier_id",
                                { supplier_name: this.getSupplierName() },
                                { label: 'supplier_name', value: 'supplier_id' },
                                (data) => {
                                    this.props.addSupplierType(data);
                                },
                                this.supplierTypeDropdown
                            );
                        }}
                        onChange={(state) => {
                            setFieldValue('supplier_id', state);
                        }}
                        onChangeSearchText={(text) => {
                            this.onChangeType(
                                "mst-supplier",
                                "supplier_name,supplier_id",
                                { supplier_name: text },
                                { label: 'supplier_name', value: 'supplier_id' },
                                (data) => {
                                    this.props.addSupplierType(data);
                                },
                                this.supplierTypeDropdown
                            );
                        }}
                        touched={touched.supplier_id}
                        error={errors.supplier_id}
                    />

                    <CustomTextInput
                        label="Invoice"
                        onChangeText={handleChange('invoice')}
                        onBlur={handleBlur('invoice')}
                        value={values.invoice}
                        touched={touched.invoice}
                        error={errors.invoice}
                        containerStyle={{ marginTop: 24 }}
                    />

                    <CustomDateTimePicker
                        label="Invoice Date"
                        value={values.invoice_date}
                        onChange={(state) => {
                            setFieldValue('invoice_date', state)
                        }}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomTextInput
                        label="Price"
                        keyboardType="numeric"
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                        touched={touched.price}
                        error={errors.price}
                        containerStyle={{ marginTop: 12 }}
                    />

                    <CustomDropdown
                        ref={this.priceCurrencyTypeDropdown}
                        containerStyle={{ marginTop: 12 }}
                        label="Price Currency"
                        itemsContainer={this.props.form.priceCurrencyType}
                        value={values.price_currency}
                        onChange={(state) => {
                            setFieldValue('price_currency', state);
                        }}
                        touched={touched.price_currency}
                        error={errors.price_currency}
                    />

                    <CustomButton
                        containerStyle={styles.container_submit}
                        buttonStyle={styles.submit}
                        titleStyle={styles.text_submit}
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </ScrollView>
            </>
        )
    }
}

const getItemCode = async (item_id, item_code) => {
    const findOne = await CRUDService.findAll(`/item/item_code`, {
        item_id: item_id,
        item_code: item_code,
    });
    return findOne ? false : true;
}

const create = async (post) => {
    const created = await CRUDService.create("/item", post);
    return created;
}

const updateOneById = async (item_id, post) => {
    const updated = await CRUDService.updateOneById("/item", item_id, post);
    return updated;
}

const schema = yup.object().shape({
    item_code: yup.string().required("Item Code is required").test(
        'is-exist',
        'Item Code is already exist',
        async (value, context) => {
            return await getItemCode(context.options.parent.item_id, value) == true
        }
    ),
    price: yup.string().test(
        'Digits only',
        'Price should have digits only',
        (value) => /^\d+$/.test(value)
    ),
    location_id: yup.string().required("Location is required"),
    coll_type_id: yup.string().required("Collection Type is required"),
    // item_status_id: yup.string().required("Item Status Type is required"),
});

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({
            item_id: "",
            item_code: "",
            // call_number: "",
            inventory_code: "",
            location_id: "",
            shelf_location: "",
            coll_type_id: "",
            item_status_id: "",
            order_number: "",
            order_date: getCurrentDate(),
            received_date: getCurrentDate(),
            supplier_id: "",
            source: 0,
            invoice: "",
            invoice_date: getCurrentDate(),
            price: "0",
            price_currency: "",
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

        let form = {
            ...values,
            source: values.source + 1
        };
        delete form['item_id']

        // For list biblio item in form bibliography
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

        if (values.location_id) {
            const location_name = getItemFromItems(values.location_id, props.form.locationType);
            form['location_name'] = location_name;
        }

        if (values.coll_type_id) {
            const coll_type_name = getItemFromItems(values.coll_type_id, props.form.collTypeType);
            form['coll_type_name'] = coll_type_name;
        }

        if (values.supplier_id) {
            const supplier_name = getItemFromItems(values.supplier_id, props.form.supplierType);
            form['supplier_name'] = supplier_name;
        }

        if (values.item_status_id) {
            const item_status_name = getItemFromItems(values.item_status_id, props.form.itemStatusType);
            form['item_status_name'] = item_status_name;
        }

        let req;
        let messageToast;
        if (props.route.params.action == "add") {
            if (props.route.params.mode == 'edit') {
                req = await create({
                    ...values,
                    source: values.source + 1,
                    biblio_id: props.route.params.biblio_id
                });
                form['item_id'] = req.item_id;

                if (!req) {
                    props.setIsLoading();
                    return;
                }
                messageToast = "Data added";
            } else {
                let findItemCode = props.form.item.find((item) => {
                    return values.item_code == item.item_code;
                })

                if (findItemCode) {
                    Message.showToast("Item Code is exist")
                    props.setIsLoading();
                    return;
                }
            }

            props.addItem(form)
        } else {
            if (props.route.params.mode == "edit") {
                req = await updateOneById(props.route.params.data.item_id, {
                    ...values,
                    source: values.source + 1,
                    item_id: props.route.params.data.item_id,
                });

                if (!req) {
                    props.setIsLoading();
                    return;
                }
            }
            props.editItem({
                ...form,
                index: props.route.params.index,
                item_id: props.route.params.data.item_id,
            })
        }

        props.setIsLoading();
        props.navigation.goBack();
    },

    // displayName: 'BasicForm',
})(MyForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setIsLoading,
            addItem,
            editItem,
            addLocationType,
            addCollTypeType,
            addItemStatusType,
            addSupplierType
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(formikEnhancer)

const styles = StyleSheet.create({
    content: {
        backgroundColor: COLORS.white,
        flexGrow: 1,
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
    },
    field: {
        marginTop: 24
    },
    text_field: {
        ...FONTS.body3,
        color: COLORS.gray3
    },
})
