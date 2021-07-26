import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { COLORS, FONTS, SIZES } from '../../constants';

const CustomTextInput = ({
    onChangeText,
    onBlur,
    iconPosition,
    icon,
    containerStyle = {},
    containerInputStyle = {},
    value,
    label,
    required,
    multiline = false,
    numberOfLines = 1,
    error,
    touched,
    ...props
}) => {
    const getFlexDirection = () => {
        if (icon && iconPosition) {
            if (iconPosition === 'left') {
                return 'row';
            } else if (iconPosition === 'right') {
                return 'row-reverse';
            }
        } else {
            return 'row';
        }
    };

    const getStyleContainerInput = () => {
        let style = {
            flexDirection: getFlexDirection(),
            alignItems: icon ? 'center' : 'baseline',
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 8,
        }

        function jsonConcat(o1, o2) {
            for (var key in o2) {
                o1[key] = o2[key];
            }
            return o1;
        }

        if (Object.keys(containerInputStyle).length > 0) {
            style = jsonConcat(style, containerInputStyle);
        } else {
            style['backgroundColor'] = COLORS.lightGray2;
        }

        return style;
    }

    // console.log("getFlexDirection", getStyleContainerInput())


    return (
        // <View style={{ marginBottom: 10 }}>
        //     {/* {label && <Text style={styles.label}>{label}</Text>} */}
        //     <View style={{ flexDirection: getFlexDirection(), ...styles.input, alignItems: 'baseline' }}>
        //         {/* <View>{icon && icon}</View> */}
        //         {/* <TextInput style={{flex: 1, color: COLORS.lightGray, ...FONTS.body3}} placeholder="Password" secureTextEntry /> */}
        //     </View>
        //     {error && <Text style={styles.error}>{error}</Text>}
        // </View>
        <View style={containerStyle}>
            <Text style={styles.label}>{label + (required ? ' *': '')}</Text>
            <View style={getStyleContainerInput()}>
                {icon}
                <TextInput
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    placeholder={label}
                    style={[styles.input, {textAlignVertical: multiline ? 'top' : 'center'}]}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    {...props} />
            </View>
            {error && touched ? <Text style={{ color: COLORS.lightRed, ...FONTS.body4 }}>{error}</Text> : null}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    label: {
        ...FONTS.body3,
        color: COLORS.lightGray,
        marginBottom: 10
    },
    input: {
        flex: 1,
        color: COLORS.lightGray,
        ...FONTS.body3,
        textAlignVertical: 'top'
    }
})
