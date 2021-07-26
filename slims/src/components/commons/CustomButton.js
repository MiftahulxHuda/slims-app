import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const CustomButton = ({
    containerStyle,
    buttonStyle,
    titleStyle,
    title,
    onPress,
    icon
}) => {
    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <View style={buttonStyle}>
                {icon}
                <Text style={titleStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})
