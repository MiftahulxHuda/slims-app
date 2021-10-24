import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
        modalVisible: false,
        bottomSheetVisible: false,
    },
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
        setModalVisible: (state) => {
            state.modalVisible = !state.modalVisible;
        },
        setBottomSheetVisible: (state) => {
            state.bottomSheetVisible = !state.bottomSheetVisible;
        },
    },
});

export const { setIsLoading, setModalVisible, setBottomSheetVisible } = loadingSlice.actions;

export default loadingSlice.reducer;
