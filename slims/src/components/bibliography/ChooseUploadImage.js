import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-crop-picker';

import { COLORS, FONTS } from '../../constants'
import CustomButton from '../commons/CustomButton';

const ChooseUploadImage = ({
    onSetImage,
    onClose,
}) => {
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            // compressImageMaxWidth: 300,
            // compressImageMaxHeight: 300,
            // compressImageQuality: 0.7,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            onSetImage(image);
            // onClose();
        }).catch(error => {
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            onSetImage(image);
            // onClose();
        }).catch(error => {
        });
    }


    return (
        <>
            <View style={styles.content}>
                <CustomButton
                    buttonStyle={styles.button}
                    titleStyle={styles.text_button}
                    title="Take Photo"
                    onPress={takePhotoFromCamera}
                />

                <CustomButton
                    containerStyle={styles.container_button_choose_from_library}
                    buttonStyle={styles.button}
                    titleStyle={styles.text_button}
                    title="Choose From Library"
                    onPress={choosePhotoFromLibrary}
                />
            </View>
        </>
    )
}

export default ChooseUploadImage

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
        padding: 15
    },
    container_button_choose_from_library: {
        marginTop: 20
    },
    button: {
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    text_button: {
        ...FONTS.h3,
        color: COLORS.white
    }
})
