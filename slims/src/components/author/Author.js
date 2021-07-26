import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Dimensions, FlatList, Modal } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';

import { COLORS } from '../../constants'
import Header from '../commons/Header';
import ModalDelete from '../commons/ModalDelete';
import FilterAuthor from './FilterAuthor';
import AuthorItem from './AuthorItem';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'name',
        year: 'year',
        type: 'type',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'name',
        year: 'year',
        type: 'type',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'name',
        year: 'year',
        type: 'type',
    },
    {
        id: '4',
        name: 'name',
        year: 'year',
        type: 'type',
    },
    {
        id: '5',
        name: 'name',
        year: 'year',
        type: 'type',
    },
    {
        id: '6',
        name: 'name',
        year: 'year',
        type: 'type',
    },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const bottomSheetHeight = windowHeight - statusBarHeight;

const Author = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [blur, setBlur] = useState(0);

    const renderItem = ({ item }) => (
        <AuthorItem
            name={item.name}
            year={item.year}
            type={item.type}
            onEdit={() => navigation.push("FormAuthor", { action: "edit" })}
            onDelete={() => setModalVisible(true)}
        />
    );

    const sheetRef = React.useRef(null);

    const renderContent = () => (
        <View
            style={{
                height: bottomSheetHeight,
            }}
        >
            <FilterAuthor
                onClose={() => sheetRef.current.snapTo(2)}
            />
        </View>
    );

    return (
        <>
            <View style={[styles.blur, { zIndex: blur }]}></View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalDelete
                    onCancel={() => setModalVisible(!modalVisible)}
                    onDelete={() => setModalVisible(!modalVisible)}
                />
            </Modal>
            <View style={styles.container}>
                <Header title="Author"
                    onBack={() => navigation.toggleDrawer()}
                    onPressFilter={() => {
                        setBlur(1);
                        sheetRef.current.snapTo(1);
                    }}
                    onAdd={() => navigation.push("FormAuthor", { action: "add" })}
                    styleTextTitle={{ flex: 2 }}
                />

                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View >
            <BottomSheet
                ref={sheetRef}
                snapPoints={[windowHeight - statusBarHeight, windowHeight * 0.4, 0]}
                initialSnap={2}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={() => {
                    setBlur(0)
                }}
            />
        </>
    )
}

export default Author

const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        backgroundColor: COLORS.black,
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    list: {
        paddingTop: 50
    },
})
