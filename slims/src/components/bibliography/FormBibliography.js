import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar, FlatList, LogBox } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik'
import * as yup from 'yup';
import BottomSheet from 'reanimated-bottom-sheet';

import { COLORS, FONTS, SIZES } from '../../constants';
import DetailHeader from '../commons/DetailHeader';
import CustomTextInput from '../commons/CustomTextInput';
import CustomDropdown from '../commons/CustomDropdown';
import CustomButton from '../commons/CustomButton';
import CustomRadioButton from '../commons/CustomRadioButton';
import UploadImage from './UploadImage';
import HeaderFilter from '../commons/HeaderFilter';
import ChooseUploadImage from './ChooseUploadImage';
import AddAuthor from './AddAuthor';
import Accordion from '../commons/Accordion';
import AuthorItem from './AuhtorItem';
import AddSuject from './AddSuject';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const bottomSheetHeight = windowHeight - statusBarHeight;

const FormBibliography = ({ navigation }) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const sheetRefUploadImage = React.useRef(null);
    const sheetRefAddAuthor = React.useRef(null);
    const sheetRefAddSubject = React.useRef(null);
    const [BSName, setBSName] = useState(null);
    const [blur, setBlur] = useState(0);
    const [image, setImage] = useState('https://edit.org/images/cat/book-covers-big-2019101610.jpg');
    const [authors, setAuthors] = useState([
        {
            id: '1',
            code: 'code',
            name: 'name',
        },
        // {
        //     id: '2',
        //     code: 'code',
        //     name: 'name',
        // },
        // {
        //     id: '3',
        //     code: 'code',
        //     name: 'name',
        // },
    ]);

    const renderItem = ({ item }) => (
        <AuthorItem
            code={item.code}
            name={item.name}
            onEdit={() => navigation.push("FormGMD", { action: "edit" })}
            onDelete={() => setModalVisible(true)}
        />
    );

    const cbSetImage = (image) => {
        console.log("image", image)
        setImage(image);
    }

    const renderHeader = () => {
        let title = "";
        switch (BSName) {
            case "upload_image":
                title = "Upload Image";
                break;

            case "add_author":
                title = "Add Author(s)";
                break;

            case "add_subject":
                title = "Add Subject(s)";
                break;

            default:
                break;
        }

        let onClose;
        switch (BSName) {
            case "upload_image":
                onClose = () => {
                    sheetRefUploadImage.current.snapTo(1)
                }
                break;

            case "add_author":
                onClose = () => {
                    sheetRefAddAuthor.current.snapTo(2)
                }
                break;

            case "add_subject":
                onClose = () => {
                    sheetRefAddSubject.current.snapTo(2)
                }
                break;

            default:
                break;
        }

        return (
            <HeaderFilter
                title={title}
                onClose={onClose}
            />
        );
    }

    const renderContent = () => {
        switch (BSName) {
            case "upload_image":
                return (
                    <View
                        style={{
                            height: 150,
                        }}
                    >
                        <ChooseUploadImage
                            onSetImage={cbSetImage}
                            onClose={() => sheetRefUploadImage.current.snapTo(1)}
                        />
                    </View>
                );

            case "add_author":
                return (
                    <View
                        style={{
                            height: bottomSheetHeight - 50,
                        }}
                    >
                        <AddAuthor />
                    </View>
                );

            case "add_subject":
                return (
                    <View
                        style={{
                            height: bottomSheetHeight - 50,
                        }}
                    >
                        <AddSuject />
                    </View>
                );

            default:
                break;
        }
    }

    const gmdType = [
        { label: 'Text', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const contentTypeType = [
        { label: 'Not set', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const frequencyType = [
        { label: 'Not applicable', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const publisherType = [
        { label: 'Prentice Hall', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const publishingPlaceType = [
        { label: 'Publishing Place', value: '1' },
        { label: 'Geographic', value: '2' },
    ];

    const classificationType = [
        { label: 'Classification', value: '1' },
    ];

    const languageType = [
        { label: 'Indonesia', value: '1' },
        { label: 'English', value: '2' },
    ];

    const hideInOPAC = [
        { label: 'param1', value: 0 },
        { label: 'param2', value: 1 }
    ];

    const promoteToHomepage = [
        { label: 'param1', value: 0 },
        { label: 'param2', value: 1 }
    ];

    return (
        <>
            <View style={[styles.blur, { zIndex: blur }]}></View>

            <View style={styles.container}>
                <DetailHeader
                    title="Add Bibliography"
                    iconPosition="left"
                    icon={
                        <Icon
                            name="chevron-left"
                            size={SIZES.h1}
                            color={COLORS.white}
                            onPress={() => {
                                navigation.popToTop();
                            }}
                        />
                    }
                />
                <ScrollView
                    contentContainerStyle={styles.formContentContainer}
                >
                    <Formik
                        initialValues={{
                            title: '',
                            sor: '',
                            edition: '',
                            sdi: '',
                            gmd: '',
                            content_type: '',
                            frequency: '',
                            isbn_issn: '',
                            publisher: '',
                            publishing_place: '',
                            collation: '',
                            series_title: '',
                            classification: '',
                            call_number: '',
                            language: '',
                            abstract_notes: '',
                            hide_in_opac: hideInOPAC[0].value,
                            promote_to_homepage: promoteToHomepage[0].value,
                        }}
                        onSubmit={values => signIn()}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
                            <>
                                <UploadImage
                                    image={image}
                                    onPress={() => {
                                        setBlur(1);
                                        setBSName("upload_image");
                                        sheetRefUploadImage.current.snapTo(0);
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
                                />

                                <View style={styles.field}>
                                    <Text style={styles.text_field}>Author(s)</Text>

                                    <CustomButton
                                        containerStyle={styles.container_author}
                                        buttonStyle={styles.author}
                                        titleStyle={styles.text_author}
                                        title="Add Author(s)"
                                        onPress={() => {
                                            setBlur(1);
                                            setBSName("add_author");
                                            sheetRefAddAuthor.current.snapTo(1);
                                        }}
                                    />

                                    <FlatList
                                        data={authors}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                        style={styles.list}
                                        contentContainerStyle={styles.contentList}
                                        showsVerticalScrollIndicator={true}
                                    />

                                </View>

                                <CustomTextInput
                                    label="Statement of Responbility"
                                    onChangeText={handleChange('sor')}
                                    onBlur={handleBlur('sor')}
                                    value={values.sor}
                                    touched={touched.sor}
                                    error={errors.sor}
                                    containerStyle={{ marginTop: 10 }}
                                />

                                <CustomTextInput
                                    label="Edition"
                                    onChangeText={handleChange('edition')}
                                    onBlur={handleBlur('edition')}
                                    value={values.edition}
                                    touched={touched.edition}
                                    error={errors.edition}
                                    containerStyle={{ marginTop: 10 }}
                                />

                                <CustomTextInput
                                    label="Spesific Detail Info"
                                    onChangeText={handleChange('sdi')}
                                    onBlur={handleBlur('sdi')}
                                    value={values.sdi}
                                    touched={touched.sdi}
                                    error={errors.sdi}
                                    containerStyle={{ marginTop: 10 }}
                                    multiline={true}
                                    numberOfLines={2}
                                />

                                {/* Item Data */}

                                <CustomDropdown
                                    containerStyle={{ marginTop: 10 }}
                                    label="GMD"
                                    itemsContainer={gmdType}
                                    value={values.gmd}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.gmd);
                                        }

                                        setFieldValue('gmd', newState);
                                    }}
                                    touched={touched.gmd}
                                    error={errors.gmd}
                                    zIndex={3000}
                                    zIndexInverse={1000}
                                />

                                <CustomDropdown
                                    containerStyle={{ marginTop: 20 }}
                                    label="Content Type"
                                    itemsContainer={contentTypeType}
                                    value={values.content_type}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.content_type);
                                        }

                                        setFieldValue('content_type', newState);
                                    }}
                                    touched={touched.content_type}
                                    error={errors.content_type}
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                />

                                <CustomDropdown
                                    containerStyle={{ marginTop: 20 }}
                                    label="Frequency"
                                    itemsContainer={frequencyType}
                                    value={values.frequency}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.frequency);
                                        }

                                        setFieldValue('frequency', newState);
                                    }}
                                    touched={touched.frequency}
                                    error={errors.frequency}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                />

                                <CustomTextInput
                                    label="ISBN/ISSN"
                                    onChangeText={handleChange('isbn_issn')}
                                    onBlur={handleBlur('isbn_issn')}
                                    value={values.isbn_issn}
                                    touched={touched.isbn_issn}
                                    error={errors.isbn_issn}
                                    containerStyle={{ marginTop: 20 }}
                                />

                                <CustomDropdown
                                    containerStyle={{ marginTop: 10 }}
                                    label="Publisher"
                                    itemsContainer={publisherType}
                                    value={values.publisher}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.publisher);
                                        }

                                        setFieldValue('publisher', newState);
                                    }}
                                    touched={touched.publisher}
                                    error={errors.publisher}
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                />

                                <CustomTextInput
                                    label="Publishing Year"
                                    onChangeText={handleChange('publishing_year')}
                                    onBlur={handleBlur('publishing_year')}
                                    value={values.publishing_year}
                                    touched={touched.publishing_year}
                                    error={errors.publishing_year}
                                    containerStyle={{ marginTop: 20 }}
                                />

                                <CustomDropdown
                                    containerStyle={{ marginTop: 10 }}
                                    label="Publishing Place"
                                    itemsContainer={publishingPlaceType}
                                    value={values.publishing_place}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.publishing_place);
                                        }

                                        setFieldValue('publishing_place', newState);
                                    }}
                                    touched={touched.publishing_place}
                                    error={errors.publishing_place}
                                    zIndex={3000}
                                    zIndexInverse={1000}
                                />

                                <CustomTextInput
                                    label="Collation"
                                    onChangeText={handleChange('collation')}
                                    onBlur={handleBlur('collation')}
                                    value={values.collation}
                                    touched={touched.collation}
                                    error={errors.collation}
                                    containerStyle={{ marginTop: 20 }}
                                />

                                <CustomTextInput
                                    label="Series Title"
                                    onChangeText={handleChange('series_title')}
                                    onBlur={handleBlur('series_title')}
                                    value={values.series_title}
                                    touched={touched.series_title}
                                    error={errors.series_title}
                                    containerStyle={{ marginTop: 10 }}
                                />

                                <CustomDropdown
                                    containerStyle={{ marginTop: 10 }}
                                    label="Classification"
                                    itemsContainer={classificationType}
                                    value={values.classification}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.classification);
                                        }

                                        setFieldValue('classification', newState);
                                    }}
                                    touched={touched.classification}
                                    error={errors.classification}
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                />

                                <CustomTextInput
                                    label="Call Number"
                                    onChangeText={handleChange('call_number')}
                                    onBlur={handleBlur('call_number')}
                                    value={values.call_number}
                                    touched={touched.call_number}
                                    error={errors.call_number}
                                    containerStyle={{ marginTop: 20 }}
                                />

                                <View style={styles.field}>
                                    <Text style={styles.text_field}>Add Subject(s)</Text>

                                    <CustomButton
                                        containerStyle={styles.container_subject}
                                        buttonStyle={styles.subject}
                                        titleStyle={styles.text_subject}
                                        title="Add Subject(s)"
                                        onPress={() => {
                                            setBlur(1);
                                            setBSName("add_subject");
                                            sheetRefAddSubject.current.snapTo(1);
                                        }}
                                    />

                                    <FlatList
                                        data={authors}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                        style={styles.list}
                                        contentContainerStyle={styles.contentList}
                                        showsVerticalScrollIndicator={true}
                                    />

                                </View>

                                <CustomDropdown
                                    containerStyle={{ marginTop: 10 }}
                                    label="Language"
                                    itemsContainer={languageType}
                                    value={values.language}
                                    onChange={(state) => {
                                        let newState = state;

                                        if (typeof state === "function") {
                                            newState = state(values.language);
                                        }

                                        setFieldValue('language', newState);
                                    }}
                                    touched={touched.language}
                                    error={errors.language}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                />

                                <CustomTextInput
                                    label="Abstract Notes"
                                    onChangeText={handleChange('abstract_notes')}
                                    onBlur={handleBlur('abstract_notes')}
                                    value={values.abstract_notes}
                                    touched={touched.abstract_notes}
                                    error={errors.abstract_notes}
                                    containerStyle={{ marginTop: 20 }}
                                    multiline={true}
                                    numberOfLines={2}
                                />

                                <View style={styles.field}>
                                    <Text style={styles.text_field}>Hide in OPAC</Text>
                                    <CustomRadioButton
                                        containerStyle={{ marginTop: 5 }}
                                        radioProps={hideInOPAC}
                                        value={values.hide_in_opac}
                                        onChange={(state) => {
                                            let newState = state;

                                            if (typeof state === "function") {
                                                newState = state(values.hide_in_opac);
                                            }

                                            setFieldValue('hide_in_opac', newState);
                                        }}
                                    />
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.text_field}>Promote To Homepage</Text>
                                    <CustomRadioButton
                                        containerStyle={{ marginTop: 5 }}
                                        radioProps={promoteToHomepage}
                                        value={values.promote_to_homepage}
                                        onChange={(state) => {
                                            let newState = state;

                                            if (typeof state === "function") {
                                                newState = state(values.promote_to_homepage);
                                            }

                                            setFieldValue('promote_to_homepage', newState);
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
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </View>

            <BottomSheet
                ref={sheetRefUploadImage}
                snapPoints={[200, 0]}
                renderHeader={renderHeader}
                renderContent={renderContent}
                initialSnap={1}
                onCloseEnd={() => {
                    setBlur(0);
                }}
            />

            <BottomSheet
                ref={sheetRefAddAuthor}
                snapPoints={[bottomSheetHeight, 420, 0]}
                renderHeader={renderHeader}
                renderContent={renderContent}
                initialSnap={2}
                onCloseEnd={() => {
                    setBlur(0);
                }}
            />

            <BottomSheet
                ref={sheetRefAddSubject}
                snapPoints={[bottomSheetHeight, 420, 0]}
                renderHeader={renderHeader}
                renderContent={renderContent}
                initialSnap={2}
                onCloseEnd={() => {
                    setBlur(0);
                }}
            />
        </>
    )
}

export default FormBibliography

const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        backgroundColor: COLORS.black,
        width: '100%',
        height: '100%',
        opacity: 0.8
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    formContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    field: {
        marginTop: 10
    },
    text_field: {
        ...FONTS.body3,
        color: COLORS.lightGray
    },
    container_author: {
        marginTop: 5
    },
    author: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_author: {
        ...FONTS.h3,
        color: COLORS.white
    },
    container_subject: {
        marginTop: 5
    },
    subject: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.lightGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_subject: {
        ...FONTS.h3,
        color: COLORS.white
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
        elevation: 2,
    },
    text_submit: {
        ...FONTS.h3,
        color: COLORS.white
    },
    list: {
        marginTop: 10,
    },
    contentList: {
        paddingTop: 10
    },
})
