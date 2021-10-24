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
          <CustomTextInput
            required={true}
            label="Prefix"
            onChangeText={handleChange('prefix')}
            onBlur={handleBlur('prefix')}
            value={values.prefix}
            touched={touched.prefix}
            error={errors.prefix}
          />

          <CustomTextInput
            required={true}
            label="Suffix"
            onChangeText={handleChange('suffix')}
            onBlur={handleBlur('suffix')}
            value={values.suffix}
            touched={touched.suffix}
            error={errors.suffix}
            containerStyle={{ marginTop: 12 }}
          />

          <CustomTextInput
            required={true}
            label="Length Serial Number"
            onChangeText={handleChange('length_sn')}
            onBlur={handleBlur('length_sn')}
            value={values.length_sn}
            touched={touched.length_sn}
            error={errors.length_sn}
            keyboardType="numeric"
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
  prefix: yup.string().required("Prefix is required"),
  suffix: yup.string().required("Suffix is required"),
  length_sn: yup.string().required("Length Serial Number is required"),
});

const create = async (post) => {
  const created = await CRUDService.create("/setting/item-code-pattern", post);
  return created;
}

const formikEnhancer = withFormik({
  mapPropsToValues: (props) => {
    return ({ 
      prefix: "",
      suffix: "",
      length_sn: "",
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
    if (props.route.params.action == "add") {
      req = await create(values)
      messageToast = "Data added";
    }
    
    if (req) {
      props.setIsLoading();
      Message.showToast(messageToast)
      // props.navigation.goBack();
    } else {
      props.setIsLoading();
    }
  },

  // displayName: 'BasicForm',
})(MyForm);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setIsLoading,
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
