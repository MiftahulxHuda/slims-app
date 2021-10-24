import { createSlice } from '@reduxjs/toolkit';

const filterContentTypeSlice = createSlice({
    name: 'filterContentType',
    initialState: {
        initialValues: { content_type: '' },
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

export const { setInitialValues, resetFilter } = filterContentTypeSlice.actions;

export default filterContentTypeSlice.reducer;
