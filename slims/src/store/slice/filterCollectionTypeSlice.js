import { createSlice } from '@reduxjs/toolkit';

const filterCollectionTypeSlice = createSlice({
    name: 'filterCollectionType',
    initialState: {
        initialValues: { coll_type_name: '' },
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

export const { setInitialValues, resetFilter } = filterCollectionTypeSlice.actions;

export default filterCollectionTypeSlice.reducer;
