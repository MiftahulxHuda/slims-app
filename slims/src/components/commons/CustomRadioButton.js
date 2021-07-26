import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../../constants';
import { onChange } from 'react-native-reanimated';

const CustomRadioButton = ({
    containerStyle,
    radioProps,
    value,
    onChange,
}) => {
    // const [value, setValue] = useState(0)

    // const onPress = (obj) => {
    //     // setValue(obj.value)
    //     return onChange(obj.value);
    // }
    
    return (
        <View style={containerStyle}>
            <RadioForm
                animation={true}
            >
                {/* To create radio buttons, loop through your array of options */}
                {
                    radioProps.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={value === i}
                                onPress={onChange}
                                borderWidth={1}
                                buttonInnerColor={COLORS.primary}
                                buttonOuterColor={COLORS.lightGray}
                                buttonSize={9}
                                buttonOuterSize={18}
                                buttonStyle={{}}
                                buttonWrapStyle={{ alignSelf: 'center' }}
                            />
                            <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={onChange}
                                labelStyle={{ ...FONTS.body3, color: COLORS.lightGray }}
                                labelWrapStyle={{}}
                            />
                        </RadioButton>
                    ))
                }
            </RadioForm>
        </View>
    )
}

export default CustomRadioButton

const styles = StyleSheet.create({})
