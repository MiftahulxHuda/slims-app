import { createSlice } from '@reduxjs/toolkit';

const filterPublisherSlice = createSlice({
    name: 'filterPublisher',
    initialState: {
        initialValues: { publisher_name: '' },
        isReset: false
    },
    reducers: {
        setInitialValues: (state, action) => {
            for (const key in action.payload) {
                state.initialValues[key] = action.payload[key]
            }
        },
        resetFilter: (state) => {
            state.isReset = !state.isReset;
        },
    },
});

export const { setInitialValues, resetFilter } = filterPublisherSlice.actions;

export default filterPublisherSlice.reducer;
