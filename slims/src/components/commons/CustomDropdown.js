import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, FONTS } from '../../constants';

export default class CustomDropdown extends PureComponent {
    constructor(props) {
        super(props)

        // console.log(this.props.itemsContainer)
        // console.log(this.props.value == null)

        this.state = {
            open: false,
            items: this.props.itemsContainer,
            value: this.props.value,
            loading: false,
        }

        this.setOpen = this.setOpen.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    componentDidMount() {
    }

    setLoading() {
        this.setState((previousState) => {
            return {
                loading: !previousState.loading
            }
        });
    }

    setItemsFromPC(items) {
        this.setState({
            items: items
        });
    }

    setValueFromPC(value) {
        this.setState({
            value: value
        });
    }

    setOpen(open) {
        if (this.props.onOpen) {
            if (open) {
                this.setLoading()
                this.props.onOpen()
            }
        }

        this.setState({
            open
        });
    }

    setValue(callback) {
        this.setState(state => {
            return {
                value: callback(state.value)
            }
        }, () => {
            this.props.onChange(this.state.value)
        });
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    getLabel() {
        if (!this.props.label) {
            return null;
        }

        return (
            <Text style={styles.label}>{this.props.label + (this.props.required ? ' *' : '')}</Text>
        )
    }

    render() {
        return (
            <View style={this.props.containerStyle}>
                {this.getLabel()}
                <DropDownPicker
                    open={this.state.open}
                    value={this.state.value}
                    items={this.state.items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    containerStyle={{ height: 40 }}
                    placeholder={"Select " + (this.props.placeholder ? this.props.placeholder : this.props.label)}
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        borderRadius: 8,
                        borderWidth: 0
                    }}
                    textStyle={{
                        ...FONTS.body3,
                        color: COLORS.gray1
                    }}
                    listMode="MODAL"
                    // zIndex={this.props.zIndex}
                    // zIndexInverse={this.props.zIndexInverse}
                    searchable={this.props.searchable}
                    searchPlaceholder="Search"
                    loading={this.state.loading}
                    disableLocalSearch={this.props.disableLocalSearch}
                    onChangeSearchText={(text) => {
                        // Show the loading animation
                        if (this.props.disableLocalSearch) {
                            this.setLoading()
                            this.props.onChangeSearchText(text);
                        }


                        //     setTimeout(() => {
                        //         setLoading(false);
                        //     }, 3000);

                        //     // Get items from API
                        //     // API.get("/items/search", {
                        //     //     text
                        //     // })
                        //     //     .then((items) => {
                        //     //         setItems(items);
                        //     //     })
                        //     //     .catch((err) => {
                        //     //         //
                        //     //     })
                        //     //     .finally(() => {
                        //     //         // Hide the loading animation
                        //     //         setLoading(false);
                        //     //     });
                    }}
                    searchContainerStyle={{
                        borderBottomColor: COLORS.gray3
                    }}
                    searchTextInputStyle={{
                        color: COLORS.gray3
                    }}
                />
                {this.props.error && this.props.touched ?
                    <Text style={{
                        color: COLORS.lightRed,
                        ...FONTS.body4,
                        marginTop: 10
                    }}>{this.props.error}</Text>
                    : null
                }
            </View>
        )
    }
}

CustomDropdown.defaultProps = {
    backgroundColor: COLORS.lightGray2,
    disableLocalSearch: false
};

const styles = StyleSheet.create({
    label: {
        ...FONTS.body3,
        color: COLORS.gray3,
        marginBottom: 10
    },
});