import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

const UploadImage = ({
    image,
    onPress
}) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={onPress}>
                <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ImageBackground
                        source={{
                            uri: image,
                        }}
                        style={{ height: 100, width: 100 }}
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
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UploadImage

const styles = StyleSheet.create({})
