import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES } from '../../constants';
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import { setIsLoading } from '../../store/slice/loadingSlice';
import {
  addAttachment,
  editAttachment,
} from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import CustomDropdown from '../commons/CustomDropdown';
import DropdownComponent from '../commons/DropdownComponent';
import CustomRadioButton from '../commons/CustomRadioButton';
import CustomCheckbox from '../commons/CustomCheckbox';

class MyForm extends PureComponent {
  constructor(props) {
    super(props);

    this.accessTypeDropdown = React.createRef();
    this.changeMemberType = this.changeMemberType.bind(this);
    this.getMemberType = this.getMemberType.bind(this);

    this.state = {
      memberType: [],
      ckbx: false
    }
    this.placement = [
      { label: 'Link', value: 0 },
      { label: 'Popup', value: 1 },
      { label: 'Embed', value: 2 },
    ];
  }

  getPlacementOption(placement) {
    let placementEnum = 0;
    switch (placement) {
      case 'link':
        placementEnum = 0;
        break;

      case 'popup':
        placementEnum = 1;
        break;

      case 'embed':
        placementEnum = 2;
        break;

      default:
        break;
    }
    return placementEnum;
  }


  async findOneById(id) {
    const findOneById = await CRUDService.findOneById(`${'/files'}/${id}`);
    if (findOneById) {
      // let biblioAttachment = {
      //     placement: this.props.route.params.data.placement,
      //     access_type: this.props.route.params.data.access_type,
      //     access_limit: this.props.route.params.data.access_limit,
      // }

      // if(this.props.route.params.mode == "edit") {
      //     biblioAttachment['placement'] = findO
      // }



      this.props.setValues({
        file_title: findOneById.file_title,
        file_name: { name: findOneById.file_name },
        file_url: findOneById.file_url,
        file_desc: findOneById.file_desc,
        placement: this.getPlacementOption(this.props.route.params.data.placement),
        access_limit: this.props.route.params.data.access_limit,
        access_type: this.props.route.params.data.access_type,
      });

      this.accessTypeDropdown.current.setValueFromPC(
        this.props.route.params.data.access_type,
      );
    }
  }

  async getMemberType() {
    const find = await CRUDService.findAll(`${'/mst-member-type'}`);
    if (find) {
      let memberType = [];
      for (let iFind = 0; iFind < find.length; iFind++) {
        const element = find[iFind];
        memberType.push({
          label: element.member_type_name,
          member_type_id: element.member_type_id,
        })
        this.setState({ [`memberType${element.member_type_id}`]: false });
      }

      // const memberType = find.map((item, index) => {
      //   return {
      //     label: item.member_type_name,
      //     member_type_id: item.member_type_id,
      //     // value: false
      //   }
      // })
      this.setState({ memberType: memberType }, () => {
        if (this.props.route.params.action == 'edit') {
          for (let iMemberType = 0; iMemberType < this.state.memberType.length; iMemberType++) {
            const elMemberType = this.state.memberType[iMemberType];
            for (let iAccessLimit = 0; iAccessLimit < this.props.route.params.data.access_limit.length; iAccessLimit++) {
              const elAccessLimit = this.props.route.params.data.access_limit[iAccessLimit];
              if (elMemberType.member_type_id == elAccessLimit) {
                this.setState({ [`memberType${elAccessLimit}`]: true });
                continue;
              }
            }
          }
        }
      });
    }
  }

  componentDidMount() {
    this.getMemberType()

    if (this.props.route.params.action == 'edit') {
      this.findOneById(this.props.route.params.data.file_id);

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
      if (this.props.route.params.mode == 'add') {
        this.props.resetForm({ values: '' });
      } else {
        this.props.resetForm({
          values: {
            file_name: this.props.values.file_name,
            placement: 0,
          },
        });
      }

      this.accessTypeDropdown.current.setValueFromPC(null);
      this.props.resetFilter();
    }
  }

  async uploadFile() {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
      });
      this.props.setFieldValue('file_name', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  changeMemberType(index, state) {
    this.setState({ [`memberType${index}`]: state }, () => {
      let memberType = []
      for (let iMemberType = 0; iMemberType < this.state.memberType.length; iMemberType++) {
        const element = this.state.memberType[iMemberType];
        // element['value'] = this.state[`memberType${iMemberType}`]
        if (this.state[`memberType${element.member_type_id}`]) {
          memberType.push(element.member_type_id);
        }
      }

      this.props.setFieldValue('access_limit', memberType)
    })
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
    } = this.props;

    return (
      <>
        <ScrollView contentContainerStyle={styles.content}>
          <CustomTextInput
            label="Title"
            required={true}
            onChangeText={handleChange('file_title')}
            onBlur={handleBlur('file_title')}
            value={values.file_title}
            touched={touched.file_title}
            error={errors.file_title}
          />

          <View style={styles.field}>
            <Text style={styles.text_field}>File To Attach * (Maximum 40960 KB)</Text>

            {this.props.route.params.action == 'add' ? (
              <CustomButton
                containerStyle={styles.container_upload_file}
                buttonStyle={styles.upload_file}
                titleStyle={styles.text_upload_file}
                title="Choose File"
                onPress={() => {
                  this.uploadFile();
                }}
                icon={
                  <Icon
                    name="file"
                    size={SIZES.h3}
                    color={COLORS.white}
                  />
                }
              />
            ) : null}

            {values.file_name ? (
              <Text style={styles.text_file_name}>{values.file_name.name}</Text>
            ) : null}
            {errors.file_name ? (
              <Text style={{ color: COLORS.lightRed, ...FONTS.body4 }}>
                {errors.file_name}
              </Text>
            ) : null}
          </View>

          <CustomTextInput
            label="URL"
            onChangeText={handleChange('file_url')}
            onBlur={handleBlur('file_url')}
            value={values.file_url}
            touched={touched.file_url}
            error={errors.file_url}
            containerStyle={{ marginTop: 12 }}
          />

          <View style={styles.field}>
            <Text style={styles.text_field}>Placement (For Video Attachment)</Text>

            <CustomRadioButton
              containerStyle={{ marginTop: 6 }}
              radioProps={this.placement}
              value={values.placement}
              onChange={state => {
                setFieldValue('placement', state);
              }}
            />
          </View>

          <CustomTextInput
            label="Description"
            onChangeText={handleChange('file_desc')}
            onBlur={handleBlur('file_desc')}
            value={values.file_desc}
            touched={touched.file_desc}
            error={errors.file_desc}
            containerStyle={{ marginTop: 12 }}
            multiline={true}
            numberOfLines={2}
          />

          <CustomDropdown
            required={true}
            ref={this.accessTypeDropdown}
            containerStyle={{ marginTop: 12 }}
            label="Access"
            itemsContainer={this.props.form.accessAttachmentType}
            value={values.access_type}
            onChange={state => {
              setFieldValue('access_type', state);
            }}
            touched={touched.access_type}
            error={errors.access_type}
          />

          <View style={styles.access_limit}>
            <Text style={styles.text_access_limit}>
              Access Limit by Member Type
            </Text>

            {
              this.state.memberType.map((item, index) => {
                return <CustomCheckbox
                  label={item.label}
                  value={this.state[`memberType${item.member_type_id}`]}
                  key={item.member_type_id}
                  onValueChange={(state) => {
                    this.changeMemberType(item.member_type_id, state)
                    // this.setState((previousState) => {
                    //   let memberType = previousState.memberType;
                    //   memberType[index]['value'] = state;

                    //   return {
                    //     memberType: memberType
                    //   }
                    // })
                  }}
                />
              })
            }

            {/* <CustomCheckbox
              label="Standard"
              value={values.access_limit}
              onValueChange={state => {
                setFieldValue('access_limit', state);
              }}
            /> */}
          </View>

          <CustomButton
            containerStyle={styles.container_submit}
            buttonStyle={styles.submit}
            titleStyle={styles.text_submit}
            title="Submit"
            onPress={handleSubmit}
          />
        </ScrollView>
      </>
    );
  }
}

const schema = yup.object().shape({
  file_title: yup.string().required('Title is required'),
  file_name: yup.object().required('File is required'),
  access_type: yup.string().required('Access is required'),
});

const getPlacementEnumInBiblioAttachment = (placement) => {
  let placementEnum = "";
  switch (placement) {
    case 0:
      placementEnum = 'link';
      break;

    case 1:
      placementEnum = 'popup';
      break;

    case 2:
      placementEnum = 'embed';
      break;

    default:
      break;
  }
  return placementEnum;
}

const createFiles = async post => {
  const created = await CRUDService.createFormData('/files', post);
  return created;
};

const updateFiles = async (file_id, post) => {
  const updated = await CRUDService.updateOneById('/files', file_id, post);
  return updated;
};

const createBiblioAttachment = async post => {
  const created = await CRUDService.create('/biblio/biblio_attachment', post);
  return created;
};

const updateBiblioAttachment = async (file_id, post) => {
  const updated = await CRUDService.updateOneById('/biblio/biblio_attachment', file_id, post);
  return updated;
};

// const updateOneById = async (file_id, post) => {
//   const updated = await CRUDService.updateOneById(
//     '/biblio/biblio_attachment',
//     file_id,
//     post,
//   );
//   return updated;
// };

const formikEnhancer = withFormik({
  mapPropsToValues: props => {
    return {
      file_title: '',
      file_name: '',
      file_url: '',
      placement: 0,
      file_desc: '',
      access_type: '',
      access_limit: [],
    };
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

    let files = {
      file_title: values.file_title,
      file_desc: values.file_desc,
      file_url: values.file_url,
    }

    let biblioAttachment = {
      placement: getPlacementEnumInBiblioAttachment(values.placement),
      access_type: values.access_type,
      access_limit: values.access_limit,
    };

    let formData = new FormData();
    formData.append("file_title", values["file_title"]);
    formData.append("file_name", values["file_name"]);
    formData.append("file_desc", values["file_desc"]);
    formData.append("file_url", values["file_url"]);

    let attachment = {
      ...biblioAttachment,
      placement: values.placement,
      ...files,
    }

    let req;
    let messageToast;
    if (props.route.params.action == 'add') {
      req = await createFiles(formData);
      if (req) {
        biblioAttachment['file_id'] = req.file_id;
        attachment['file_id'] = biblioAttachment['file_id']
        if (props.route.params.mode == 'edit') {
          attachment['biblio_id'] = props.route.params.biblio_id

          req = await createBiblioAttachment({
            biblio_id: props.route.params.biblio_id,
            file_id: biblioAttachment['file_id'],
            placement: biblioAttachment.placement,
            access_type: values.access_type,
            access_limit: values.access_limit,
          });
        }

        if (req) {
          props.addAttachment(attachment);
        }
      }
      messageToast = 'Data added';
    } else {
      req = await updateFiles(props.route.params.data.file_id, files);
      if (req) {
        biblioAttachment['file_id'] = props.route.params.data.file_id;
        biblioAttachment['biblio_id'] = props.route.params.biblio_id;
        req = await updateBiblioAttachment(props.route.params.data.file_id, biblioAttachment);
      }

      if (req) {
        props.editAttachment({
          ...attachment,
          index: props.route.params.index,
          file_id: props.route.params.data.file_id,
          biblio_id: props.route.params.biblio_id,
        })
      }
      messageToast = 'Data updated';
    }

    if (req) {
      props.setIsLoading();
      Message.showToast(messageToast);
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
      setIsLoading,
      addAttachment,
      editAttachment,
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(formikEnhancer);

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    padding: 16,
  },
  container_submit: {
    marginTop: 32,
  },
  submit: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  text_submit: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  field: {
    marginTop: 12,
  },
  text_field: {
    ...FONTS.body3,
    color: COLORS.gray3,
  },
  access_limit: {
    marginTop: 24,
  },
  text_access_limit: {
    ...FONTS.body3,
    color: COLORS.gray3,
  },
  container_upload_file: {
    marginTop: 4,
    alignItems: 'flex-start'
  },
  upload_file: {
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    padding: 12,
  },
  text_upload_file: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: 8
  },
  text_file_name: {
    ...FONTS.body4,
    color: COLORS.lightGray4,
    fontStyle: 'italic',
  },
});
