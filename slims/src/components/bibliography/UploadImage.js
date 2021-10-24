import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS } from '../../constants';
import CustomButton from '../commons/CustomButton';

const UploadImage = ({
    containerStyle,
    image,
    imageBackground,
    onPress,
    onDelete
}) => {
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <ImageBackground
                        source={imageBackground}
                        style={{ width: 100, height: 120, alignSelf: 'center' }}
                        imageStyle={{ borderRadius: 15 }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Icon
                                name="camera"
                                size={35}
                                color="#fff"
                                style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </ImageBackground>
                    {image ?
                        <CustomButton
                            containerStyle={styles.container_remove_image}
                            buttonStyle={styles.remove_image}
                            titleStyle={styles.text_remove_image}
                            title="Remove Image"
                            onPress={onDelete}
                        /> : null
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    container_remove_image: {
        marginTop: 5
    },
    remove_image: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.lightRed,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    text_remove_image: {
        ...FONTS.h3,
        color: COLORS.white
    },
})
