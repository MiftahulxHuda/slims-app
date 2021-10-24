import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Dimensions, FlatList, Modal, ActivityIndicator } from 'react-native'

import { COLORS } from '../../constants'
import Header from '../commons/Header';
import GMDItem from './GMDItem';
import ModalDelete from '../commons/ModalDelete';
import CRUDService from '../../service/CRUDService.service';
import EmptyList from '../commons/EmptyList';
import Message from '../commons/Message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const bottomSheetHeight = windowHeight - statusBarHeight;

export default class GMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flatListReady: false,
            data: [],
            isLoading: false,
            currentPage: 0,
            scroll: true,
            deleteId: 0,
            refreshing: false,
        }

        this.take = 10;
        this.sheetRef = React.createRef();

        this.scrolled = this.scrolled.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                flatListReady: false,
                isLoading: true,
                scroll: true,
                data: [],
                currentPage: 0,
            }, () => this.getData())
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.flatListReady && prevState.currentPage != this.state.currentPage) {
            this.setState({ isLoading: true });
            this.getData();
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    filterCount() {
        let count = 0;

        for (const key in this.props.filter) {
            if (this.props.filter[key].toString().trim().length > 0) {
                count++;
            }
        }

        return count;
    }

    async getData() {
        const list = await CRUDService.findAll("/mst-gmd", {
            take: this.take,
            skip: this.state.currentPage,
            sort: "gmd_name,gmd_id",
            ...this.props.filter
        })

        if (list) {
            this.setState((previousState) => {
                return {
                    ...previousState,
                    data: previousState.data.concat(list.data)
                }
            })

            if (this.state.data.length >= list.count) {
                this.setState({ scroll: false })
            }

            this.setState({ isLoading: false })
        }
    }

    renderItem({ item }) {
        return (
            <GMDItem
                code={item.gmd_code}
                name={item.gmd_name}
                onEdit={() => this.props.navigation.push("FormGMD", { action: "edit", gmd_id: item.gmd_id })}
                onDelete={() => {
                    this.setState({ deleteId: item.gmd_id })
                    this.props.setModalVisible();
                }}
            />
        )
    };

    scrolled() {
        this.setState({ flatListReady: true })
    }

    loadMore() {
        if (!this.state.flatListReady) return null

        if (this.state.scroll == true && this.state.isLoading == false) {
            this.setState({ currentPage: this.state.data.length });
        }
    }

    renderFooter() {
        if (!this.state.isLoading) return null;

        return (
            <View style={styles.loader}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        )
    }

    handleRefresh() {
        this.setState({
            flatListReady: false,
            isLoading: true,
            scroll: true,
            data: [],
            currentPage: 0,
            refreshing: true
        }, () => {
            this.setState({ refreshing: false })
            this.getData()
        })
    }

    render() {
        return (
            <>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.deleteId > 0}
                    onRequestClose={() => {
                        this.setState({ deleteId: 0 });
                        this.props.setModalVisible()
                    }}
                >
                    <ModalDelete
                        onCancel={() => {
                            this.setState({ deleteId: 0 });
                            this.props.setModalVisible()
                        }}
                        onSubmit={async () => {
                            const deleted = await CRUDService.deleteOneById("/mst-gmd", this.state.deleteId);
                            if (deleted) {
                                const filtered = await this.state.data.filter(filter => filter.gmd_id != this.state.deleteId);
                                this.setState({ data: filtered, deleteId: 0 });
                                this.props.setModalVisible()
                                Message.showToast('Data Deleted')
                            }
                        }}
                    />
                </Modal>
                <View style={styles.container}>
                    <Header title="GMD (General Material Designation)"
                        onBack={() => this.props.navigation.toggleDrawer()}
                        onPressFilter={() => {
                            this.props.navigation.push("FilterGMD")
                        }}
                        onAdd={() => this.props.navigation.push("FormGMD", { action: "add" })}
                        styleTextTitle={{ flex: 5 }}
                        filterCount={this.filterCount()}
                    />

                    <FlatList
                        onScroll={this.scrolled}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.gmd_id}
                        initialNumToRender={5}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={0.3}
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                        ListEmptyComponent={<EmptyList />}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View >
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    list: {
        paddingTop: 50
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
})
