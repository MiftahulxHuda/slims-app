import React, { PureComponent } from 'react'
import { BackHandler, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withFormik } from 'formik'
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, images, SIZES } from '../../constants'
import CustomTextInput from '../commons/CustomTextInput';
import CustomButton from '../commons/CustomButton';
import { setIsLoading } from '../../store/slice/loadingSlice';
import {
    setAuthor,
    deleteAuthor,
    addGMDType,
    addContentTypeType,
    addMediaTypeType,
    addCarrierTypeType,
    addFrequencyType,
    addPublisherType,
    addPlaceType,
    setTopic,
    deleteTopic,
    addLanguageType,
    setAttachment,
    deleteAttachment,
    setItem,
    deleteItem,
    setRelation,
    deleteRelation,
    addItemCodePatternType
} from '../../store/slice/formBibliographySlice';
import CRUDService from '../../service/CRUDService.service';
import Message from '../commons/Message';
import BiblioAuthorItem from './BiblioAuthorItem';
import CustomDropdown from '../commons/CustomDropdown';
import BiblioTopicItem from './BiblioTopicItem';
import CustomRadioButton from '../commons/CustomRadioButton';
import UploadImage from './UploadImage';
import HeaderFilter from '../commons/HeaderFilter';
import Blur from '../commons/Blur';
import ChooseUploadImage from './ChooseUploadImage';
import BiblioAttachmentItem from './BiblioAttachmentItem';
import ModalDelete from '../commons/ModalDelete';
import { API_CONFIG } from '../../constants/api_config';
import BiblioItemItem from './BiblioItemItem';
import BiblioRelationItem from './BiblioRelationItem';

class MyForm extends PureComponent {
    constructor(props) {
        super(props)

        this.sheetRefUploadImage = React.createRef();
        this.renderHeaderUploadImage = this.renderHeaderUploadImage.bind(this);
        this.renderContentUploadImage = this.renderContentUploadImage.bind(this);
        this.cbSetImage = this.cbSetImage.bind(this);

        this.GMDTypeDropdown = React.createRef();
        this.itemCodePatternTypeDropdown = React.createRef();
        this.contentTypeDropdown = React.createRef();
        this.mediaTypeDropdown = React.createRef();
        this.carrierTypeDropdown = React.createRef();
        this.frequencyTypeDropdown = React.createRef();
        this.publisherTypeDropdown = React.createRef();
        this.placeTypeDropdown = React.createRef();
        this.languageTypeDropdown = React.createRef();

        this.onChangeType = this.onChangeType.bind(this);
        this.hideInOPAC = [
            { label: 'Show', value: 0 },
            { label: 'Hide', value: 1 }
        ];
        this.promoteToHomepage = [
            { label: `Don't Promote`, value: 0 },
            { label: 'Promote', value: 1 }
        ];

        this.state = {
            bottomSheetVisible: false,
            modalVisible: false,
            modalAction: '',
            deleteData: null,
            cover: null,
            image: null,
            findImage: null
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this._isMounted = false;
    }

    fall = new Animated.Value(1)

    async findOneById(id) {
        const findOneById = await CRUDService.findOneById(`${"/biblio"}/${id}`);
        if (findOneById) {
            const findAuthor = await CRUDService.findOneById(`${"/biblio/biblio_author"}/${id}`);
            const findTopic = await CRUDService.findOneById(`${"/biblio/biblio_topic"}/${id}`);
            const findAttachment = await CRUDService.findOneById(`${"/biblio/biblio_attachment"}/${id}`);
            const findRelation = await CRUDService.findOneById(`${"/biblio/biblio_relation"}/${id}`);
            const findItem = await CRUDService.findOneById(`${"/item/biblio"}/${id}`);

            if (findAuthor && findTopic && findAttachment && findItem && findRelation && this._isMounted) {
                this.props.setAuthor(findAuthor);
                this.props.setTopic(findTopic);
                this.props.setAttachment(findAttachment);
                this.props.setRelation(findRelation);
                this.props.setItem(findItem);

                this.props.setValues({
                    // image: {
                    // uri: values.image.path,
                    // type: values.image.mime,
                    //     name: findOneById.image
                    // },
                    // image: '',
                    title: findOneById.title,
                    sor: findOneById.sor,
                    edition: findOneById.edition,
                    spec_detail_info: findOneById.spec_detail_info,
                    gmd_id: findOneById.gmd_id,
                    content_type_id: findOneById.content_type_id,
                    media_type_id: findOneById.media_type_id,
                    carrier_type_id: findOneById.carrier_type_id,
                    frequency_id: findOneById.frequency_id,
                    isbn_issn: findOneById.isbn_issn,
                    publisher_id: findOneById.publisher_id,
                    publish_year: findOneById.publish_year,
                    publish_place_id: findOneById.publish_place_id,
                    collation: findOneById.collation,
                    series_title: findOneById.series_title,
                    classification: findOneById.classification,
                    call_number: findOneById.call_number,
                    language_id: findOneById.language_id,
                    notes: findOneById.notes,
                    opac_hide: findOneById.opac_hide,
                    promoted: findOneById.promoted,
                })

                this.onChangeType(
                    "mst-gmd",
                    "gmd_name,gmd_id",
                    { gmd_name: findOneById.gmd_name },
                    { label: 'gmd_name', value: 'gmd_id' },
                    (data) => {
                        this.props.addGMDType(data);
                    },
                    this.GMDTypeDropdown
                );
                this.GMDTypeDropdown.current.setValueFromPC(findOneById.gmd_id);

                this.onChangeType(
                    "mst-content-type",
                    "content_type,id",
                    { content_type: findOneById.content_type },
                    { label: 'content_type', value: 'id' },
                    (data) => {
                        this.props.addContentTypeType(data);
                    },
                    this.contentTypeDropdown
                );
                this.contentTypeDropdown.current.setValueFromPC(findOneById.content_type_id);

                this.onChangeType(
                    "mst-media-type",
                    "media_type,id",
                    { media_type: findOneById.media_type },
                    { label: 'media_type', value: 'id' },
                    (data) => {
                        this.props.addMediaTypeType(data);
                    },
                    this.mediaTypeDropdown
                );
                this.mediaTypeDropdown.current.setValueFromPC(findOneById.media_type_id);

                this.onChangeType(
                    "mst-carrier-type",
                    "carrier_type,id",
                    { carrier_type: findOneById.carrier_type },
                    { label: 'carrier_type', value: 'id' },
                    (data) => {
                        this.props.addCarrierTypeType(data);
                    },
                    this.carrierTypeDropdown
                );
                this.carrierTypeDropdown.current.setValueFromPC(findOneById.carrier_type_id);

                this.onChangeType(
                    "mst-frequency",
                    "frequency,frequency_id",
                    { frequency: findOneById.frequency },
                    { label: 'frequency', value: 'frequency_id' },
                    (data) => {
                        this.props.addFrequencyType(data);
                    },
                    this.frequencyTypeDropdown
                );
                this.frequencyTypeDropdown.current.setValueFromPC(findOneById.frequency_id);

                this.onChangeType(
                    "mst-publisher",
                    "publisher_name,publisher_id",
                    { publisher_name: findOneById.publisher_name },
                    { label: 'publisher_name', value: 'publisher_id' },
                    (data) => {
                        this.props.addPublisherType(data);
                    },
                    this.publisherTypeDropdown
                );
                this.publisherTypeDropdown.current.setValueFromPC(findOneById.publisher_id);

                this.onChangeType(
                    "mst-place",
                    "place_name,place_id",
                    { place_name: findOneById.place_name },
                    { label: 'place_name', value: 'place_id' },
                    (data) => {
                        this.props.addPlaceType(data);
                    },
                    this.placeTypeDropdown
                );
                this.placeTypeDropdown.current.setValueFromPC(findOneById.publish_place_id);

                this.onChangeType(
                    "mst-language",
                    "language_name,language_id",
                    { language_name: findOneById.language_name },
                    { label: 'language_name', value: 'language_id' },
                    (data) => {
                        this.props.addLanguageType(data);
                    },
                    this.languageTypeDropdown
                );
                this.languageTypeDropdown.current.setValueFromPC(findOneById.language_id);

                if (findOneById.image) {
                    this.setState({
                        image: findOneById.image,
                        cover: { uri: API_CONFIG.baseUrl + '/image_docs/' + findOneById.image },
                        findImage: findOneById.image
                    })
                }
            }

        }
    }

    onChangeType(url, sort, filter, keyItem, addType, typeDropDown) {
        // console.log(url, sort, filter, addType, typeDropDown)
        if (this._isMounted) {
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
                        case 'mst-gmd':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-content-type':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-media-type':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-carrier-type':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-frequency':
                            result.data.unshift({ label: 'Not Applicable', value: '' });
                            break;

                        case 'mst-publisher':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-place':
                            result.data.unshift({ label: 'Not Set', value: '' });
                            break;

                        case 'mst-language':
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
    }

    // onChangeGMD(text) {
    //     CRUDService.findAll("/mst-gmd", {
    //         take: 10,
    //         skip: 0,
    //         sort: "gmd_name,gmd_id",
    //         gmd_name: text
    //     })
    //         .then((result) => {
    //             if (result.count > 0) {
    //                 for (let index = 0; index < result.data.length; index++) {
    //                     const element = result.data[index];
    //                     result.data[index] = { label: element.gmd_name, value: element.gmd_id }
    //                 }

    //                 this.props.addGMDType(result.data);
    //                 this.GMDTypeDropdown.current.setItemsFromPC(result.data)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         .finally(() => {
    //             this.GMDTypeDropdown.current.setLoading();
    //         });
    // }

    handleBackButtonClick() {
        if (this.props.loading) {
            this.props.setIsLoading();
        }

        this.props.navigation.goBack();
        return true;
    }

    async componentDidMount() {
        this._isMounted = true;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        this.props.setIsLoading();
        if (this.props.route.params.action == "edit") {
            await this.findOneById(this.props.route.params.id)
        }

        if (this._isMounted) {
            this.props.setIsLoading();
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
            this.props.resetForm({
                values: ''
            });
            this.setState({ cover: null })
            this.GMDTypeDropdown.current.setValueFromPC(null);
            this.contentTypeDropdown.current.setValueFromPC(null);
            this.mediaTypeDropdown.current.setValueFromPC(null);
            this.carrierTypeDropdown.current.setValueFromPC(null);
            this.frequencyTypeDropdown.current.setValueFromPC(null);
            this.publisherTypeDropdown.current.setValueFromPC(null);
            this.placeTypeDropdown.current.setValueFromPC(null);
            this.languageTypeDropdown.current.setValueFromPC(null);

            this.props.resetFilter();
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;

        this.props.setAuthor([]);
        this.props.setTopic([]);
        this.props.setAttachment([]);
        this.props.setItem([]);
        this.props.setRelation([]);
    }

    renderHeaderUploadImage() {
        return (
            <HeaderFilter
                title="Upload Image"
                onClose={() => {
                    // console.warn('BIBI')
                    this.sheetRefUploadImage.current.snapTo(1)
                }}
            />
        );
    }

    cbSetImage(image) {
        this.setState({ image: image.path, cover: { uri: image.path } })
        this.props.setFieldValue('image', image)
    }

    renderContentUploadImage() {
        return (
            <View
                style={{
                    height: 150,
                    zIndex: 2
                }}
            >
                <ChooseUploadImage
                    onSetImage={this.cbSetImage}
                // onClose={() => this.sheetRefUploadImage.current.snapTo(1)}
                />
            </View>
        );
    }

    getBiblioAuthor() {
        if (this.props.form.author.length == 0) {
            return null
        }

        const biblioAuthor = this.props.form.author.map((item, index) => {
            return (
                <BiblioAuthorItem
                    author_name={item.author_name}
                    level={item.level}
                    levelType={this.props.form.levelType}
                    level_name={item.level_name}
                    key={index}
                    onDelete={() => {
                        this.setState({ modalAction: 'delete_author', deleteData: { ...item, index } })
                        this.setModalVisible()
                    }}
                />
            )
        })

        return (
            <View>
                {biblioAuthor}
            </View>
        );
    }

    getBiblioItem() {
        if (this.props.form.item.length == 0) {
            return null
        }

        const biblioItem = this.props.form.item.map((item, index) => {
            return (
                <BiblioItemItem
                    item_code={item.item_code}
                    location_name={item.location_name}
                    coll_type_name={item.coll_type_name}
                    key={index}
                    onEdit={() => this.props.navigation.push("FormItem", {
                        action: "edit",
                        mode: this.props.route.params.action,
                        data: item,
                        index: index,
                        biblio_id: this.props.route.params.id
                    })}
                    onDelete={() => {
                        this.setState({ modalAction: 'delete_item', deleteData: { ...item, index } })
                        this.setModalVisible()
                    }}
                />
            )
        })

        return (
            <View>
                {biblioItem}
            </View>
        );
    }

    getBiblioTopic() {
        if (this.props.form.topic.length == 0) {
            return null
        }

        const biblioTopic = this.props.form.topic.map((item, index) => {
            return (
                <BiblioTopicItem
                    topic_name={item.topic_name}
                    level={item.level}
                    levelType={this.props.form.levelTopicType}
                    level_name={item.level_name}
                    key={index}
                    onDelete={() => {
                        this.setState({ modalAction: 'delete_topic', deleteData: { ...item, index } })
                        this.setModalVisible()
                    }}
                />
            )
        })

        return (
            <View>
                {biblioTopic}
            </View>
        );
    }

    getBiblioAttachment() {
        if (this.props.form.attachment.length == 0) {
            return null
        }

        const biblioAttachment = this.props.form.attachment.map((item, index) => {
            return (
                <BiblioAttachmentItem
                    file_title={item.file_title}
                    file_desc={item.file_desc}
                    key={index}
                    onEdit={() => this.props.navigation.push("FormAttachment", {
                        action: "edit",
                        mode: this.props.route.params.action,
                        data: item,
                        index: index,
                        biblio_id: this.props.route.params.id
                    })}
                    onDelete={() => {
                        this.setState({ modalAction: 'delete_attachment', deleteData: { ...item, index } })
                        this.setModalVisible()
                    }}
                />
            )
        })

        return (
            <View>
                {biblioAttachment}
            </View>
        );
    }

    getBiblioRelation() {
        if (this.props.form.relation.length == 0) {
            return null
        }

        const biblioRelation = this.props.form.relation.map((item, index) => {
            return (
                <BiblioRelationItem
                    title={item.title}
                    key={index}
                    onDelete={() => {
                        this.setState({ modalAction: 'delete_relation', deleteData: { ...item, index } })
                        this.setModalVisible()
                    }}
                />
            )
        })

        return (
            <View>
                {biblioRelation}
            </View>
        );
    }

    setBottomSheetVisible() {
        this.setState((previousState) => {
            return {
                bottomSheetVisible: !previousState.bottomSheetVisible
            }
        })
    }

    setModalVisible() {
        this.setState((previousState) => {
            return {
                modalVisible: !previousState.modalVisible
            }
        })
    }

    getGMDName() {
        if (this.props.values.gmd_id) {
            const item = this.props.form.GMDType.filter(val => val.value == this.props.values.gmd_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getContentTypeName() {
        if (this.props.values.content_type_id) {
            const item = this.props.form.contentTypeType.filter(val => val.value == this.props.values.content_type_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getMediaTypeName() {
        if (this.props.values.media_type_id) {
            const item = this.props.form.mediaTypeType.filter(val => val.value == this.props.values.media_type_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getCarrierTypeName() {
        if (this.props.values.carrier_type_id) {
            const item = this.props.form.carrierTypeType.filter(val => val.value == this.props.values.carrier_type_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getFrequencyName() {
        if (this.props.values.frequency_id) {
            const item = this.props.form.frequencyType.filter(val => val.value == this.props.values.frequency_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getPublisherName() {
        if (this.props.values.publisher_id) {
            const item = this.props.form.publisherType.filter(val => val.value == this.props.values.publisher_id)
            return item[0].label;
        } else {
            return '';
        }
    }
    
    getPlaceName() {
        if (this.props.values.place_id) {
            const item = this.props.form.placeType.filter(val => val.value == this.props.values.place_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    getLanguageName() {
        if (this.props.values.language_id) {
            const item = this.props.form.languageType.filter(val => val.value == this.props.values.language_id)
            return item[0].label;
        } else {
            return '';
        }
    }

    renderShadow() {
        const animatedShadowOpacity = Animated.interpolateNode(this.fall, {
            inputRange: [0, 1],
            outputRange: [0.5, 0],
        })

        return (
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.shadowContainer,
                    {
                        opacity: animatedShadowOpacity,
                    },
                ]}
            />
        )
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
                <Blur isBlur={this.state.bottomSheetVisible} />
                <Blur isBlur={this.state.modalVisible} />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible()}
                >
                    <ModalDelete
                        onCancel={() => this.setModalVisible()}
                        onSubmit={async () => {
                            switch (this.state.modalAction) {
                                case 'delete_author':
                                    if (this.props.route.params.action == "edit") {
                                        const deleted = await CRUDService.delete('biblio/biblio_author', {
                                            biblio_id: this.state.deleteData.biblio_id,
                                            author_id: this.state.deleteData.author_id,
                                        });
                                        if (!deleted) {
                                            return;
                                        } else {
                                            Message.showToast('Data Deleted')
                                        }
                                    }

                                    this.props.deleteAuthor(this.state.deleteData.index)
                                    break;

                                case 'delete_item':
                                    if (this.props.route.params.action == "edit") {
                                        const deleted = await CRUDService.deleteOneById('item', this.state.deleteData.item_id);
                                        if (!deleted) {
                                            return;
                                        } else {
                                            Message.showToast('Data Deleted')
                                        }
                                    }

                                    this.props.deleteItem(this.state.deleteData.index)
                                    break;

                                case 'delete_topic':
                                    if (this.props.route.params.action == "edit") {
                                        const deleted = await CRUDService.delete('biblio/biblio_topic', {
                                            biblio_id: this.state.deleteData.biblio_id,
                                            topic_id: this.state.deleteData.topic_id,
                                        });
                                        if (!deleted) {
                                            return;
                                        } else {
                                            Message.showToast('Data Deleted')
                                        }
                                    }

                                    this.props.deleteTopic(this.state.deleteData.index)
                                    break;

                                case 'delete_attachment':
                                    if (this.props.route.params.action == "edit") {
                                        const deleted = await CRUDService.delete('biblio/biblio_attachment', {
                                            biblio_id: this.state.deleteData.biblio_id,
                                            file_id: this.state.deleteData.file_id,
                                        });
                                        if (!deleted) {
                                            return;
                                        } else {
                                            Message.showToast('Data Deleted')
                                        }
                                    }

                                    this.props.deleteAttachment(this.state.deleteData.index)
                                    break;

                                case 'delete_relation':
                                    if (this.props.route.params.action == "edit") {
                                        const deleted = await CRUDService.delete('biblio/biblio_relation', {
                                            biblio_id: this.state.deleteData.biblio_id,
                                            rel_biblio_id: this.state.deleteData.rel_biblio_id,
                                        });
                                        if (!deleted) {
                                            return;
                                        } else {
                                            Message.showToast('Data Deleted')
                                        }
                                    }

                                    this.props.deleteRelation(this.state.deleteData.index)
                                    break;

                                case 'delete_image':
                                    if (this.state.findImage) {
                                        if (!this.props.values.image) {
                                            const deleted = await CRUDService.deleteOneById('biblio/remove_cover', this.props.route.params.id)
                                            if (deleted) {
                                                setFieldValue('image', '');
                                                this.setState({ cover: null, image: null })
                                            }
                                        } else {
                                            setFieldValue('image', '');
                                            this.setState({
                                                image: this.state.findImage,
                                                cover: { uri: API_CONFIG.baseUrl + '/image_docs/' + this.state.findImage },
                                            })
                                        }
                                    } else {
                                        setFieldValue('image', '');
                                        this.setState({ cover: null, image: null })
                                    }
                                    break;

                                default:
                                    break;
                            }

                            this.setModalVisible()
                        }}
                    />
                </Modal>

                <View style={styles.container}>
                    <BottomSheet
                        ref={this.sheetRefUploadImage}
                        snapPoints={[200, 0]}
                        renderHeader={this.renderHeaderUploadImage}
                        renderContent={this.renderContentUploadImage}
                        initialSnap={1}
                        callbackNode={this.fall}
                    />

                    {this.renderShadow()}

                    {/* <UploadImage
                        containerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        image={this.state.image}
                        imageBackground={(this.state.cover ? this.state.cover : images.cover)}
                        onPress={() => {
                            // this.setState({ bottomSheetVisible: true })
                            this.sheetRefUploadImage.current.snapTo(0);
                        }}
                        onDelete={() => {
                            this.setState({ modalAction: 'delete_image' })
                            this.setModalVisible()
                        }}
                    /> */}

                    <ScrollView contentContainerStyle={styles.content}>

                        <UploadImage
                            containerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            image={this.state.image}
                            imageBackground={(this.state.cover ? this.state.cover : images.cover)}
                            onPress={() => {
                                // this.setState({ bottomSheetVisible: true })
                                this.sheetRefUploadImage.current.snapTo(0);
                            }}
                            onDelete={() => {
                                this.setState({ modalAction: 'delete_image' })
                                this.setModalVisible()
                            }}
                        />

                        <CustomTextInput
                            label="Title"
                            required={true}
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            touched={touched.title}
                            error={errors.title}
                            containerStyle={{ marginTop: 18 }}
                        />

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Author(s)</Text>

                            {this.getBiblioAuthor()}

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Add Author(s)"
                                onPress={() => {
                                    this.props.navigation.push("FormAuthor", {
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="plus-circle"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View>

                        <CustomTextInput
                            label="Statement of Responbility"
                            onChangeText={handleChange('sor')}
                            onBlur={handleBlur('sor')}
                            value={values.sor}
                            touched={touched.sor}
                            error={errors.sor}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <CustomTextInput
                            label="Edition"
                            onChangeText={handleChange('edition')}
                            onBlur={handleBlur('edition')}
                            value={values.edition}
                            touched={touched.edition}
                            error={errors.edition}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <CustomTextInput
                            label="Spesific Detail Info"
                            onChangeText={handleChange('spec_detail_info')}
                            onBlur={handleBlur('spec_detail_info')}
                            value={values.spec_detail_info}
                            touched={touched.spec_detail_info}
                            error={errors.spec_detail_info}
                            containerStyle={{ marginTop: 12 }}
                            multiline={true}
                            numberOfLines={2}
                        />

                        {/* <View style={styles.field}>
                            <Text style={styles.text_field}>Item(s) code batch generator</Text>

                            <CustomDropdown
                                ref={this.itemCodePatternTypeDropdown}
                                searchable={true}
                                disableLocalSearch={true}
                                placeholder="Pattern"
                                itemsContainer={this.props.form.itemCodePatternType}
                                value={values.gmd_id}
                                onOpen={() => {
                                    this.onChangeType(
                                        "setting/item-code-pattern",
                                        "",
                                        {},
                                        { label: 'pattern', value: 'index' },
                                        (data) => {
                                            this.props.addItemCodePatternType(data);
                                        },
                                        this.itemCodePatternTypeDropdown
                                    );
                                }}
                                onChange={(state) => {
                                    setFieldValue('gmd_id', state);
                                }}
                                touched={touched.gmd_id}
                                error={errors.gmd_id}
                                containerStyle={{ marginTop: 8 }}
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.push("FormPatternItem", { action: "add" })}>
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
                                    }}>Add Pattern</Text>
                                </View>
                            </TouchableOpacity>

                            <CustomTextInput
                                placeholder="Total Item(s)"
                                onChangeText={handleChange('total_item')}
                                onBlur={handleBlur('total_item')}
                                value={values.total_item}
                                touched={touched.total_item}
                                error={errors.total_item}
                                containerStyle={{ marginTop: 8, marginBottom: 4 }}
                            />

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Options"
                                onPress={() => {
                                    this.props.navigation.push("FormItem", {
                                        action: "add",
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="settings"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View> */}

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Item(s) Data</Text>

                            {this.getBiblioItem()}

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Add Item(s)"
                                onPress={() => {
                                    this.props.navigation.push("FormItem", {
                                        action: "add",
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="plus-circle"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View>

                        <CustomDropdown
                            ref={this.GMDTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 12 }}
                            label="GMD"
                            itemsContainer={this.props.form.GMDType}
                            value={values.gmd_id}
                            onOpen={() => {
                                this.onChangeType(
                                    "mst-gmd",
                                    "gmd_name,gmd_id",
                                    { gmd_name: this.getGMDName() },
                                    { label: 'gmd_name', value: 'gmd_id' },
                                    (data) => {
                                        this.props.addGMDType(data);
                                    },
                                    this.GMDTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('gmd_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-gmd",
                                    "gmd_name,gmd_id",
                                    { gmd_name: text },
                                    { label: 'gmd_name', value: 'gmd_id' },
                                    (data) => {
                                        this.props.addGMDType(data);
                                    },
                                    this.GMDTypeDropdown
                                );
                            }}
                            touched={touched.gmd_id}
                            error={errors.gmd_id}
                        />

                        <CustomDropdown
                            ref={this.contentTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 12 }}
                            label="Content Type"
                            itemsContainer={this.props.form.contentTypeType}
                            value={values.content_type_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-content-type",
                                    "content_type,id",
                                    { content_type: this.getContentTypeName() },
                                    { label: 'content_type', value: 'id' },
                                    (data) => {
                                        this.props.addContentTypeType(data);
                                    },
                                    this.contentTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('content_type_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-content-type",
                                    "content_type,id",
                                    { content_type: text },
                                    { label: 'content_type', value: 'id' },
                                    (data) => {
                                        this.props.addContentTypeType(data);
                                    },
                                    this.contentTypeDropdown
                                );
                            }}
                            touched={touched.content_type_id}
                            error={errors.content_type_id}
                        />

                        <CustomDropdown
                            ref={this.mediaTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 24 }}
                            label="Media Type"
                            itemsContainer={this.props.form.mediaTypeType}
                            value={values.media_type_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-media-type",
                                    "media_type,id",
                                    { media_type: this.getMediaTypeName() },
                                    { label: 'media_type', value: 'id' },
                                    (data) => {
                                        this.props.addMediaTypeType(data);
                                    },
                                    this.mediaTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('media_type_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-media-type",
                                    "media_type,id",
                                    { media_type: text },
                                    { label: 'media_type', value: 'id' },
                                    (data) => {
                                        this.props.addMediaTypeType(data);
                                    },
                                    this.mediaTypeDropdown
                                );
                            }}
                            touched={touched.media_type_id}
                            error={errors.media_type_id}
                        />

                        <CustomDropdown
                            ref={this.carrierTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 24 }}
                            label="Carrier Type"
                            itemsContainer={this.props.form.carrierTypeType}
                            value={values.carrier_type_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-carrier-type",
                                    "carrier_type,id",
                                    { carrier_type: this.getCarrierTypeName() },
                                    { label: 'carrier_type', value: 'id' },
                                    (data) => {
                                        this.props.addCarrierTypeType(data);
                                    },
                                    this.carrierTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('carrier_type_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-carrier-type",
                                    "carrier_type,id",
                                    { carrier_type: text },
                                    { label: 'carrier_type', value: 'id' },
                                    (data) => {
                                        this.props.addCarrierTypeType(data);
                                    },
                                    this.carrierTypeDropdown
                                );
                            }}
                            touched={touched.carrier_type_id}
                            error={errors.carrier_type_id}
                        />

                        <CustomDropdown
                            ref={this.frequencyTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 24 }}
                            label="Frequency (Use this for Serial publication)"
                            placeholder="Frequency"
                            itemsContainer={this.props.form.frequencyType}
                            value={values.frequency_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-frequency",
                                    "frequency,frequency_id",
                                    { frequency: this.getFrequencyName() },
                                    { label: 'frequency', value: 'frequency_id' },
                                    (data) => {
                                        this.props.addFrequencyType(data);
                                    },
                                    this.frequencyTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('frequency_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-frequency",
                                    "frequency,frequency_id",
                                    { frequency: text },
                                    { label: 'frequency', value: 'frequency_id' },
                                    (data) => {
                                        this.props.addFrequencyType(data);
                                    },
                                    this.frequencyTypeDropdown
                                );
                            }}
                            touched={touched.frequency_id}
                            error={errors.frequency_id}
                        />

                        <CustomTextInput
                            label="ISBN/ISSN"
                            onChangeText={handleChange('isbn_issn')}
                            onBlur={handleBlur('isbn_issn')}
                            value={values.isbn_issn}
                            touched={touched.isbn_issn}
                            error={errors.isbn_issn}
                            containerStyle={{ marginTop: 24 }}
                        />

                        <CustomDropdown
                            ref={this.publisherTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 12 }}
                            label="Publisher"
                            itemsContainer={this.props.form.publisherType}
                            value={values.publisher_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-publisher",
                                    "publisher_name,publisher_id",
                                    { publisher_name: this.getPublisherName() },
                                    { label: 'publisher_name', value: 'publisher_id' },
                                    (data) => {
                                        this.props.addPublisherType(data);
                                    },
                                    this.publisherTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('publisher_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-publisher",
                                    "publisher_name,publisher_id",
                                    { publisher_name: text },
                                    { label: 'publisher_name', value: 'publisher_id' },
                                    (data) => {
                                        this.props.addPublisherType(data);
                                    },
                                    this.publisherTypeDropdown
                                );
                            }}
                            touched={touched.publisher_id}
                            error={errors.publisher_id}
                        />

                        <TouchableOpacity onPress={() => this.props.navigation.push("FormPublisherMaster", { action: "add" })}>
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
                                }}>Add Publisher</Text>
                            </View>
                        </TouchableOpacity>

                        <CustomTextInput
                            label="Publishing Year"
                            onChangeText={handleChange('publish_year')}
                            onBlur={handleBlur('publish_year')}
                            value={values.publish_year}
                            touched={touched.publish_year}
                            error={errors.publish_year}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <CustomDropdown
                            ref={this.placeTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 12 }}
                            label="Publishing Place"
                            itemsContainer={this.props.form.placeType}
                            value={values.publish_place_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-place",
                                    "place_name,place_id",
                                    { place_name: this.getPlaceName() },
                                    { label: 'place_name', value: 'place_id' },
                                    (data) => {
                                        this.props.addPlaceType(data);
                                    },
                                    this.placeTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('publish_place_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-place",
                                    "place_name,place_id",
                                    { place_name: text },
                                    { label: 'place_name', value: 'place_id' },
                                    (data) => {
                                        this.props.addPlaceType(data);
                                    },
                                    this.placeTypeDropdown
                                );
                            }}
                            touched={touched.publish_place_id}
                            error={errors.publish_place_id}
                        />

                        <TouchableOpacity onPress={() => this.props.navigation.push("FormPlaceMaster", { action: "add" })}>
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
                                }}>Add Publish Place</Text>
                            </View>
                        </TouchableOpacity>

                        <CustomTextInput
                            label="Collation"
                            onChangeText={handleChange('collation')}
                            onBlur={handleBlur('collation')}
                            value={values.collation}
                            touched={touched.collation}
                            error={errors.collation}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <CustomTextInput
                            label="Series Title"
                            onChangeText={handleChange('series_title')}
                            onBlur={handleBlur('series_title')}
                            value={values.series_title}
                            touched={touched.series_title}
                            error={errors.series_title}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <CustomTextInput
                            required={true}
                            label="Classification"
                            onChangeText={handleChange('classification')}
                            onBlur={handleBlur('classification')}
                            value={values.classification}
                            touched={touched.classification}
                            error={errors.classification}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <TouchableOpacity onPress={() => {
                            setFieldValue('call_number', values.classification)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                // justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: 8
                            }}>
                                <Icon
                                    name="copy"
                                    size={SIZES.h4}
                                    color={COLORS.primary}
                                />
                                <Text style={{
                                    ...FONTS.h4,
                                    color: COLORS.primary,
                                    marginLeft: 8
                                }}>Copy to call number</Text>
                            </View>
                        </TouchableOpacity>

                        <CustomTextInput
                            required={true}
                            label="Call Number"
                            onChangeText={handleChange('call_number')}
                            onBlur={handleBlur('call_number')}
                            value={values.call_number}
                            touched={touched.call_number}
                            error={errors.call_number}
                            containerStyle={{ marginTop: 12 }}
                        />

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Add Subject(s)</Text>

                            {this.getBiblioTopic()}

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Add Subject(s)"
                                onPress={() => {
                                    this.props.navigation.push("FormSubject", {
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="plus-circle"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View>

                        <CustomDropdown
                            required={true}
                            ref={this.languageTypeDropdown}
                            searchable={true}
                            disableLocalSearch={true}
                            containerStyle={{ marginTop: 12 }}
                            label="Language"
                            itemsContainer={this.props.form.languageType}
                            value={values.language_id}
                            onOpen={(state) => {
                                this.onChangeType(
                                    "mst-language",
                                    "language_name,language_id",
                                    { language_name: this.getLanguageName() },
                                    { label: 'language_name', value: 'language_id' },
                                    (data) => {
                                        this.props.addLanguageType(data);
                                    },
                                    this.languageTypeDropdown
                                );
                            }}
                            onChange={(state) => {
                                setFieldValue('language_id', state);
                            }}
                            onChangeSearchText={(text) => {
                                this.onChangeType(
                                    "mst-language",
                                    "language_name,language_id",
                                    { language_name: text },
                                    { label: 'language_name', value: 'language_id' },
                                    (data) => {
                                        this.props.addLanguageType(data);
                                    },
                                    this.languageTypeDropdown
                                );
                            }}
                            touched={touched.language_id}
                            error={errors.language_id}
                        />

                        <CustomTextInput
                            label="Abstract Notes"
                            onChangeText={handleChange('notes')}
                            onBlur={handleBlur('notes')}
                            value={values.notes}
                            touched={touched.notes}
                            error={errors.notes}
                            containerStyle={{ marginTop: 24 }}
                            multiline={true}
                            numberOfLines={2}
                        />

                        <View style={styles.field}>
                            <Text style={styles.text_field}>File Attachment</Text>

                            {this.getBiblioAttachment()}

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Add Attachment"
                                onPress={() => {
                                    this.props.navigation.push("FormAttachment", {
                                        action: "add",
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="plus-circle"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Related Biblio</Text>

                            {this.getBiblioRelation()}

                            <CustomButton
                                containerStyle={styles.container_multiple_item}
                                buttonStyle={styles.multiple_item}
                                titleStyle={styles.text_multiple_item}
                                title="Add Relation(s)"
                                onPress={() => {
                                    this.props.navigation.push("FormRelation", {
                                        mode: this.props.route.params.action,
                                        biblio_id: this.props.route.params.id
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="plus-circle"
                                        size={SIZES.h3}
                                        color={COLORS.white}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Hide in OPAC</Text>

                            <CustomRadioButton
                                containerStyle={{ marginTop: 5 }}
                                radioProps={this.hideInOPAC}
                                value={values.opac_hide}
                                onChange={(state) => {
                                    setFieldValue('opac_hide', state);
                                }}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.text_field}>Promote To Homepage</Text>
                            <CustomRadioButton
                                containerStyle={{ marginTop: 5 }}
                                radioProps={this.promoteToHomepage}
                                value={values.promoted}
                                onChange={(state) => {
                                    setFieldValue('promoted', state);
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

                    </ScrollView>
                </View>
            </>
        )
    }
}

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    call_number: yup.string().required("Call Number is required"),
    classification: yup.string().required("Classification is required"),
    language_id: yup.string().required("Language is required"),
});

const create = async (post) => {
    const created = await CRUDService.create("/biblio", post);
    return created;
}

const upload = async (biblio_id, post) => {
    const uploaded = await CRUDService.createFormData("/biblio/upload_cover/" + biblio_id, post);
    return uploaded;
}

const updateOneById = async (biblio_id, post) => {
    const updated = await CRUDService.updateOneById("/biblio", biblio_id, post);
    return updated;
}

const createBiblioAuthorByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/biblio/biblio_author/" + biblio_id, post);
    return created;
}

const createBiblioTopicByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/biblio/biblio_topic/" + biblio_id, post);
    return created;
}

const createBiblioRelationByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/biblio/biblio_relation/" + biblio_id, post);
    return created;
}

const createBiblioAttachmentByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/biblio/biblio_attachment/" + biblio_id, post);
    return created;
}

const createSearchBiblioByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/biblio/search_biblio/" + biblio_id, post);
    return created;
}

const updateSearchBiblioByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.updateOneById("/biblio/search_biblio", biblio_id, post);
    return created;
}

const createItemByBiblioId = async (biblio_id, post) => {
    const created = await CRUDService.create("/item/biblio/" + biblio_id, post);
    return created;
}

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return ({
            image: '',
            title: '',
            sor: '',
            edition: '',
            spec_detail_info: '',
            gmd_id: '',
            content_type_id: '',
            media_type_id: '',
            carrier_type_id: '',
            frequency_id: '',
            isbn_issn: '',
            publisher_id: '',
            publish_year: '',
            publish_place_id: '',
            collation: '',
            series_title: '',
            classification: '',
            call_number: '',
            language_id: '',
            notes: '',
            opac_hide: 0,
            promoted: 1,
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

    handleSubmit: async (values, { props, setFieldValue }) => {
        props.setIsLoading();

        let form = { ...values };
        delete form['image']

        let formData = new FormData();
        if (values.image) {
            let formatImage = {
                uri: values.image.path,
                type: values.image.mime,
                name: values.title.toLowerCase().replace(" ", "_")
            }
            formData.append('image', formatImage);
        }

        let req;
        let messageToast;
        if (props.route.params.action == "add") {
            req = await create(form)
            console.log(req)
            let biblio_id
            if (req) {
                biblio_id = req.data.biblio_id;
            }

            let author = [];
            if (req && props.form.author.length > 0) {
                req = await createBiblioAuthorByBiblioId(biblio_id, props.form.author)
                author = props.form.author.map((item) => {
                    return item.author_name;
                })
            }

            let topic = [];
            if (req && props.form.topic.length > 0) {
                req = await createBiblioTopicByBiblioId(biblio_id, props.form.topic)
                topic = props.form.topic.map((item) => {
                    return item.topic_name;
                })
            }

            if (req && props.form.relation.length > 0) {
                req = await createBiblioRelationByBiblioId(biblio_id, props.form.relation)
            }

            if (req && props.form.attachment.length > 0) {
                req = await createBiblioAttachmentByBiblioId(biblio_id, props.form.attachment)
            }

            let location = [];
            let collection_types = [];
            let items = [];
            if (req && props.form.item.length > 0) {
                req = await createItemByBiblioId(biblio_id, props.form.item)
                location = props.form.item.map((item) => {
                    return item.location_name;
                })
                collection_types = props.form.item.map((item) => {
                    return item.coll_type_name;
                })
                items = props.form.item.map((item) => {
                    return item.item_code;
                })
            }

            if (req) {
                let searchBiblio = {
                    author: author.join(" - "),
                    topic: topic.join(" - "),
                    location: location.join(" - "),
                    collection_types: collection_types.join(" - "),
                    items: items.join(" - "),
                }
                req = await createSearchBiblioByBiblioId(biblio_id, searchBiblio)
            }

            if (req && values.image) {
                req = await upload(biblio_id, formData)
            }

            messageToast = "Data added";
        } else {
            req = await updateOneById(props.route.params.id, form);

            let author = [];
            if (req && props.form.author.length > 0) {
                author = props.form.author.map((item) => {
                    return item.author_name;
                })
            }

            let topic = [];
            if (req && props.form.topic.length > 0) {
                topic = props.form.topic.map((item) => {
                    return item.topic_name;
                })
            }

            let location = [];
            let collection_types = [];
            let items = [];
            if (req && props.form.item.length > 0) {
                location = props.form.item.map((item) => {
                    return item.location_name;
                })
                collection_types = props.form.item.map((item) => {
                    return item.coll_type_name;
                })
                items = props.form.item.map((item) => {
                    return item.item_code;
                })
            }

            if (req) {
                let searchBiblio = {
                    author: author.join(" - "),
                    topic: topic.join(" - "),
                    location: location.join(" - "),
                    collection_types: collection_types.join(" - "),
                    items: items.join(" - "),
                }
                req = await updateSearchBiblioByBiblioId(props.route.params.id, searchBiblio)
            }

            if (req && values.image) {
                req = await upload(props.route.params.id, formData)
            }
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
            setIsLoading,
            setAuthor,
            deleteAuthor,
            addGMDType,
            addContentTypeType,
            addMediaTypeType,
            addCarrierTypeType,
            addFrequencyType,
            addPublisherType,
            addPlaceType,
            setTopic,
            deleteTopic,
            addLanguageType,
            setAttachment,
            deleteAttachment,
            setItem,
            deleteItem,
            setRelation,
            deleteRelation,
            addItemCodePatternType
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(formikEnhancer)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        // flex: 1,
        // padding: 15
        backgroundColor: COLORS.white,
        flexGrow: 1,
        // justifyContent: 'center',
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
    field: {
        marginTop: 12
    },
    text_field: {
        ...FONTS.body3,
        color: COLORS.gray3
    },
    container_multiple_item: {
        marginTop: 4,
        alignItems: 'flex-start'
    },
    multiple_item: {
        backgroundColor: COLORS.lightPrimary,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        padding: 12,
    },
    text_multiple_item: {
        ...FONTS.h4,
        color: COLORS.white,
        marginLeft: 8
    },
    container_item: {
        marginTop: 5
    },
    item: {
        width: 120,
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_item: {
        ...FONTS.h3,
        color: COLORS.white
    },
    contentList: {
        paddingTop: 10
    },
    container_attachment: {
        marginTop: 5
    },
    attachment: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_attachment: {
        ...FONTS.h3,
        color: COLORS.white
    },
    container_rel_biblio: {
        marginTop: 5
    },
    rel_biblio: {
        width: 120,
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_rel_biblio: {
        ...FONTS.h3,
        color: COLORS.white
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#000",
        zIndex: 2,
    },
})
