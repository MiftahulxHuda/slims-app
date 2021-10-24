import React, { Component, PureComponent } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaskInput, { Masks } from 'react-native-mask-input';

import CustomTextInput from './CustomTextInput';
import { COLORS, SIZES } from '../../constants';

export default class CustomDateTimePicker extends PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            show: false,
            date: this.formatStringToDate(this.props.value)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    formatStringToDate(dateString) {
        let dateParts = dateString.split("/");
        let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        return date
    }

    show() {
        this.setState((previousState) => {
            return {
                show: !previousState.show
            }
        })
    };

    onChange(event, selectedDate) {
        const currentDate = selectedDate || this.formatStringToDate(this.props.value);
        this.show();
        this.setState({ date: currentDate })

        let dd = currentDate.getDate();
        let mm = currentDate.getMonth() + 1;

        let yyyy = currentDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let date = dd + '/' + mm + '/' + yyyy;
        this.props.onChange(date)
    };

    render() {
        return (
            <View style={this.props.containerStyle}>
                <CustomTextInput
                    label={this.props.label}
                    icon={
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ date: this.formatStringToDate(this.props.value) })
                                this.show()
                            }}>
                            <Icon name='calendar' size={SIZES.body2} color={COLORS.primary} />
                        </TouchableOpacity>
                    }
                    iconPosition="right"
                    // mask="[00]/[00]/[0000]"
                    mask={Masks.DATE_DDMMYYYY}
                    keyboardType="numeric"
                    placeholder="DD/MM/YYYY"
                    onChangeText={this.props.onChange}
                    // onBlur={handleBlur('password')}
                    value={this.props.value}
                // touched={touched.password}
                // error={errors.password}
                />

                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.props.mode}
                        // is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            this.onChange(event, selectedDate);
                        }}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
