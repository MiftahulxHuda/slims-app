import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputMask from 'react-native-text-input-mask';
import MaskInput, { Masks } from 'react-native-mask-input';

import { COLORS, FONTS, SIZES } from '../../constants';

const CustomTextInput = ({
    keyboardType = "default",
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
    mask,
    placeholder,
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

    const getLabel = () => {
        if(!label) {
            return null;
        }
        
        return (
            <Text style={styles.label}>{label + (required ? ' *' : '')}</Text>
        )
    }
    
    const getTextInput = () => {
        if (mask) {
            return (
                // <TextInputMask
                //     placeholder={placeholder}
                //     keyboardType={keyboardType}
                //     onChangeText={(formatted, extracted) => {
                //         onChangeText(formatted, extracted)
                //     }}
                //     mask={mask}
                //     style={[styles.input, {textAlignVertical: multiline ? 'top' : 'center'}]}
                //     value={value ? value : ''}
                // />

                <MaskInput
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    style={[styles.input, { textAlignVertical: multiline ? 'top' : 'center' }]}
                    value={value ? value : ''}
                    onChangeText={(formatted, extracted) => {
                        onChangeText(formatted, extracted)
                    }}
                    mask={mask}
                />
            )
        } else {
            return (
                <TextInput
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    placeholder={placeholder ? placeholder : label}
                    style={[styles.input, { textAlignVertical: multiline ? 'top' : 'center' }]}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value ? value : ''}
                    {...props} />
            )
        }
    }

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
            {getLabel()}
            <View style={getStyleContainerInput()}>
                {icon}
                {getTextInput()}
                {/* <TextInput
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    placeholder={label}
                    style={[styles.input, {textAlignVertical: multiline ? 'top' : 'center'}]}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value ? value : ''}
                    {...props} /> */}
            </View>
            {error && touched ? <Text style={{ color: COLORS.lightRed, ...FONTS.body4 }}>{error}</Text> : null}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    label: {
        ...FONTS.body3,
        color: COLORS.gray3,
        marginBottom: 8
    },
    input: {
        flex: 1,
        color: COLORS.gray3,
        ...FONTS.body3,
        textAlignVertical: 'top'
    }
})
