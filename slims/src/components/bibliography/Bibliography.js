import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Dimensions, FlatList } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';

import { COLORS } from '../../constants'
import BibliographyItem from './BibliographyItem';
import Header from '../commons/Header';
import FilterBibliography from './FilterBibliography';
import HeaderFilter from '../commons/HeaderFilter';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
    {
        id: '4',
        title: 'Four Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
    {
        id: '5',
        title: 'Five Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
    {
        id: '6',
        title: 'Six Item',
        author: 'Author',
        isbn_issn: 'ISBN/ISSN',
        copies: 1
    },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const bottomSheetHeight = windowHeight - statusBarHeight;

const Bibliography = ({ navigation }) => {
    const [blur, setBlur] = useState(0);

    const renderItem = ({ item }) => (
        <BibliographyItem
            title={item.title}
            author={item.author}
            isbn_issn={item.isbn_issn}
            copies={item.copies}
            onPress={() => { navigation.push('DetailBibliography') }}
        />
    );

    const sheetRef = React.useRef(null);

    const renderHeader = () => (
        <HeaderFilter
            title="Filter Bibliography"
            onClose={() => sheetRef.current.snapTo(2)}
        />
    )

    const renderContent = () => (
        <View
            style={{
                height: bottomSheetHeight,
            }}
        >
            <FilterBibliography />
        </View>
    );

    return (
        <>
            <View style={[styles.blur, {zIndex: blur}]}></View>
            <View style={styles.container}>
                <Header title="Bibliography"
                    onBack={() => {
                        navigation.toggleDrawer()
                    }}
                    onPressFilter={() => {
                        setBlur(1);
                        sheetRef.current.snapTo(1);
                    }}
                    onAdd={() => {
                        navigation.push("FormBibliography")
                    }}
                />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list_book}
                    showsVerticalScrollIndicator={false}
                />
            </View >
            <BottomSheet
                ref={sheetRef}
                snapPoints={[windowHeight - statusBarHeight, windowHeight * 0.8, 0]}
                initialSnap={2}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onCloseEnd={() => {
                    setBlur(0)
                }}
            />
        </>
    )
}

export default Bibliography

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
    list_book: {
        paddingTop: 50
    },
})
