import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, FONTS } from '../../constants';

const CustomDropdown = ({
    containerStyle,
    label,
    itemsContainer,
    searchable = false,
    value,
    onChange,
    error,
    touched,
    zIndex,
    zIndexInverse,
    backgroundColor = COLORS.lightGray2
}) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(itemsContainer);
    const [loading, setLoading] = useState(false);

    return (
        <View style={containerStyle}>
            <Text style={styles.label}>{label}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
                setItems={setItems}
                containerStyle={{ height: 40 }}
                placeholder={"Select " + label}
                style={{
                    backgroundColor: backgroundColor,
                    color: COLORS.lightGreen,
                    borderRadius: 8,
                    borderWidth: 0
                }}
                textStyle={{
                    ...FONTS.body3,
                    color: COLORS.lightGray4
                }}
                listMode="SCROLLVIEW"
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                searchable={searchable}
                searchPlaceholder="Search"
                loading={loading}
                disableLocalSearch={true}
                onChangeSearchText={(text) => {
                    // console.log("text", text)

                    // Show the loading animation
                    setLoading(true);

                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);

                    // Get items from API
                    // API.get("/items/search", {
                    //     text
                    // })
                    //     .then((items) => {
                    //         setItems(items);
                    //     })
                    //     .catch((err) => {
                    //         //
                    //     })
                    //     .finally(() => {
                    //         // Hide the loading animation
                    //         setLoading(false);
                    //     });
                }}

            />
            {error && touched ?
                <Text style={{
                    color: COLORS.lightRed,
                    ...FONTS.body4,
                    marginTop: 10
                }}>{error}</Text>
                : null
            }
        </View>
    );
}

export default CustomDropdown;

const styles = StyleSheet.create({
    label: {
        ...FONTS.body3,
        color: COLORS.lightGray,
        marginBottom: 10
    },
});