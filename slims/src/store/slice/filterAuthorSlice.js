import { createSlice } from '@reduxjs/toolkit';

const filterAuthorSlice = createSlice({
    name: 'filterAuthor',
    initialState: {
        initialValues: { author_name: '' },
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

export const { setInitialValues, resetFilter } = filterAuthorSlice.actions;

export default filterAuthorSlice.reducer;
