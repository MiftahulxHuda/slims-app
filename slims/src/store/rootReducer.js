import { combineReducers } from '@reduxjs/toolkit';

import filterGMD from "./slice/filterGMDSlice";
import filterContentType from "./slice/filterContentTypeSlice";
import filterMediaType from "./slice/filterMediaTypeSlice";
import filterCarrierType from "./slice/filterCarrierTypeSlice";
import filterPublisher from "./slice/filterPublisherSlice";
import filterSupplier from "./slice/filterSupplierSlice";
import filterAuthor from "./slice/filterAuthorSlice";
import filterLocation from "./slice/filterLocationSlice";
import filterPlace from "./slice/filterPlaceSlice";
import filterCollectionType from "./slice/filterCollectionTypeSlice";
import filterLanguage from "./slice/filterLanguageSlice";
import filterSubject from "./slice/filterSubjectSlice";
import filterItemStatus from "./slice/filterItemStatusSlice";
import filterFrequency from "./slice/filterFrequencySlice";
import filterBibliography from "./slice/filterBibliographySlice";
import formBibliography from "./slice/formBibliographySlice";
import loading from "./slice/loadingSlice";

const createReducer = combineReducers({
    filterGMD,
    filterContentType,
    filterMediaType,
    filterCarrierType,
    filterPublisher,
    filterSupplier,
    filterAuthor,
    filterLocation,
    filterPlace,
    filterCollectionType,
    filterLanguage,
    filterSubject,
    filterItemStatus,
    filterFrequency,
    filterBibliography,
    formBibliography,
    loading
});

export default createReducer;
