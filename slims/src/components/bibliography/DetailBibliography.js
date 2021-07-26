import React from 'react'
import { StyleSheet, Text, ScrollView, View, SafeAreaView } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS, SIZES } from '../../constants'
import DetailHeader from '../commons/DetailHeader'
import PopupMenu from '../commons/PopupMenu';

const DetailBibliography = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <DetailHeader
                iconPosition="left"
                icon={
                    <Icon
                        name="chevron-left"
                        size={SIZES.h1}
                        color={COLORS.primary}
                        onPress={() => {
                            navigation.popToTop();
                        }}
                    />
                }
                popupMenu={
                    <PopupMenu size={SIZES.h2} />
                }
            />
            <View style={styles.container_image_book}>
                <View style={{
                    backgroundColor: COLORS.lightBlue,
                    height: 130,
                    width: 130,
                }}></View>
            </View>
            <ScrollView
                style={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.details_container}>
                    <View style={styles.container_gmd_type}>
                        <Icon name="edit" size={SIZES.h2} color={COLORS.lightGreen} />
                        <Text style={styles.text_gmd_type}>Text</Text>
                    </View>
                    <Text style={styles.text_book_title}>Book Title</Text>
                    <Text style={styles.text_author}>Author</Text>
                    <Text style={styles.text_description}>Description</Text>
                    <View style={styles.container_items_data}>

                    </View>
                    <View style={styles.container_detail_information}>
                        <Text style={styles.text_detail_information}>Informasi Detail</Text>
                        <Text style={styles.text_detail_information2}>Judul Seri: A</Text>
                        <Text style={styles.text_detail_information2}>No. Panggil: A</Text>
                        <Text style={styles.text_detail_information2}>Penerbit: A</Text>
                        <Text style={styles.text_detail_information2}>Deskripsi Fisik: A</Text>
                        <Text style={styles.text_detail_information2}>Bahasa: A</Text>
                        <Text style={styles.text_detail_information2}>ISBN/ISSN: A</Text>
                        <Text style={styles.text_detail_information2}>Klasifikasi: A</Text>
                        <Text style={styles.text_detail_information2}>Tipe Isi: A</Text>
                        <Text style={styles.text_detail_information2}>Tipe Media: A</Text>
                        <Text style={styles.text_detail_information2}>Tipe Pembawa: A</Text>
                        <Text style={styles.text_detail_information2}>Edisi: A</Text>
                        <Text style={styles.text_detail_information2}>Subjek: A</Text>
                        <Text style={styles.text_detail_information2}>Info Detail Spesifik: A</Text>
                        <Text style={styles.text_detail_information2}>Pernyataan: A</Text>
                    </View>
                    <View style={styles.container_file_attachments}>
                        <Text style={styles.text_file_attachment}>Lampiran Berkas</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailBibliography

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container_image_book: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: COLORS.lightGray2,
    },
    details_container: {
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        // flex: 1,
    },
    container_gmd_type: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_gmd_type: {
        marginLeft: 6,
        ...FONTS.h3,
        color: COLORS.lightGreen
    },
    text_book_title: {
        ...FONTS.h3,
        color: COLORS.primary,
        marginTop: 15
    },
    text_author: {
        ...FONTS.body3,
        color: COLORS.lightGray3
    },
    text_description: {
        ...FONTS.body3,
        color: COLORS.lightGray3,
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        paddingVertical: 5
    },
    container_items_data: {
        height: 10,
        backgroundColor: 'black',
        marginTop: 15
    },
    container_detail_information: {
        marginTop: 15
        // borderTopWidth: 1,
        // borderTopColor: COLORS.lightGray,
        // borderBottomWidth: 1,
        // borderBottomColor: COLORS.lightGray,
    },
    text_detail_information: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    text_detail_information2: {
        ...FONTS.body3,
        color: COLORS.black,
    },
    container_file_attachments: {
        marginTop: 15
    },
    text_file_attachment: {
        ...FONTS.h3,
        color: COLORS.black,
    },
})
