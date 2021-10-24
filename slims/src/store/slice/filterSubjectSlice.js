import { createSlice } from '@reduxjs/toolkit';

const filterSubjectSlice = createSlice({
    name: 'filterSubject',
    initialState: {
        initialValues: { topic: '' },
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

export const { setInitialValues, resetFilter } = filterSubjectSlice.actions;

export default filterSubjectSlice.reducer;
