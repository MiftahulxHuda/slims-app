import React from 'react'
import { StyleSheet, Text, View, Pressable, StatusBar } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { COLORS, SIZES } from '../constants'
import CustomModal from './CustomModal'

const FilterBibliography = (props) => {
    return (
        <CustomModal modalVisible={props.modalVisible} onCloseModal={props.onCloseModal}>
            <StatusBar translucent />
            <View style={styles.centeredView}>
                <View style={styles.header}>
                    {/* <MaterialIcon
                        name="sort"
                        size={SIZES.h1}
                        color={COLORS.primary}
                        onPress={() => { props.onBack() }}
                    /> */}
                    <Icon name="times" size={SIZES.h1} color={COLORS.primary} />
                </View>
                {/* <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={props.onCloseModal}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View> */}
            </View>
        </CustomModal>
    )
}

export default FilterBibliography

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
