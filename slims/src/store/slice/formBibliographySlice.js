import { createSlice } from '@reduxjs/toolkit';

const formBibliographySlice = createSlice({
    name: 'formBibliography',
    initialState: {
        levelType: [
            { label: 'Primary Author', value: 1 },
            { label: 'Additional Author', value: 2 },
            { label: 'Editor', value: 3 },
            { label: 'Translator', value: 4 },
            { label: 'Director', value: 5 },
            { label: 'Producer', value: 6 },
            { label: 'Composer', value: 7 },
            { label: 'Ilustrator', value: 8 },
            { label: 'Creator', value: 9 },
            { label: 'Contributor', value: 10 },
        ],
        authorType: [
            { label: 'Not Set', value: '' }
        ],
        author: [],
        GMDType: [
            { label: 'Not Set', value: '' }
        ],
        itemCodePatternType: [
            { label: 'Not Set', value: '' }
        ],
        contentTypeType: [
            { label: 'Not Set', value: '' }
        ],
        mediaTypeType: [
            { label: 'Not Set', value: '' }
        ],
        carrierTypeType: [
            { label: 'Not Set', value: '' }
        ],
        frequencyType: [
            { label: 'Not Applicable', value: '' }
        ],
        publisherType: [
            { label: 'Not Set', value: '' }
        ],
        placeType: [
            { label: 'Not Set', value: '' }
        ],
        levelTopicType: [
            { label: 'Primary', value: 1 },
            { label: 'Additional', value: 2 },
        ],
        topicType: [
            { label: 'Not Set', value: '' }
        ],
        topic: [],
        languageType: [
            { label: 'Not Set', value: '' }
        ],
        accessAttachmentType: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
        ],
        attachment: [],
        locationType: [
            { label: 'Not Set', value: '' }
        ],
        collTypeType: [
            { label: 'Not Set', value: '' }
        ],
        itemStatusType: [
            { label: 'Available', value: '' }
        ],
        supplierType: [
            { label: 'Not Applicable', value: '' }
        ],
        priceCurrencyType: [
            { label: 'NONE', value: '' },
            { label: 'Rupiah', value: 'Rupiah' },
            { label: 'USD', value: 'USD' },
            { label: 'Euro', value: 'Euro' },
            { label: 'DM', value: 'DM' },
            { label: 'Pounds', value: 'Pounds' },
            { label: 'Yen', value: 'Yen' },
            { label: 'Won', value: 'Won' },
            { label: 'Yuan', value: 'Yuan' },
            { label: 'SGD', value: 'SGD' },
            { label: 'Bath', value: 'Bath' },
            { label: 'Rupee', value: 'Rupee' },
            { label: 'Taka', value: 'Taka' },
            { label: 'AUD', value: 'AUD' },
        ],
        item: [],
        biblioType: [],
        relation: []
    },
    reducers: {
        addAuthorType: (state, action) => {
            state.authorType = action.payload
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        addAuthor: (state, action) => {
            state.author.push(action.payload)
        },
        editAuthor: (state, action) => {
            let author = { ...action.payload };
            delete author["index"]

            state.author[action.payload.index] = author
        },
        deleteAuthor: (state, action) => {
            state.author.splice(action.payload, 1);
        },
        addGMDType: (state, action) => {
            state.GMDType = action.payload
        },
        addItemCodePatternType: (state, action) => {
            state.ItemCodePatternType = action.payload
        },
        addContentTypeType: (state, action) => {
            state.contentTypeType = action.payload
        },
        addMediaTypeType: (state, action) => {
            state.mediaTypeType = action.payload
        },
        addCarrierTypeType: (state, action) => {
            state.carrierTypeType = action.payload
        },
        addFrequencyType: (state, action) => {
            state.frequencyType = action.payload
        },
        addPublisherType: (state, action) => {
            state.publisherType = action.payload
        },
        addPlaceType: (state, action) => {
            state.placeType = action.payload
        },
        addTopicType: (state, action) => {
            state.topicType = action.payload
        },
        setTopic: (state, action) => {
            state.topic = action.payload;
        },
        addTopic: (state, action) => {
            state.topic.push(action.payload)
        },
        editTopic: (state, action) => {
            let topic = { ...action.payload };
            delete topic["index"]

            state.topic[action.payload.index] = topic
        },
        deleteTopic: (state, action) => {
            state.topic.splice(action.payload, 1);
        },
        addLanguageType: (state, action) => {
            state.languageType = action.payload
        },
        setAttachment: (state, action) => {
            state.attachment = action.payload;
        },
        addAttachment: (state, action) => {
            state.attachment.push(action.payload)
        },
        editAttachment: (state, action) => {
            let attachment = { ...action.payload };
            delete attachment["index"]

            state.attachment[action.payload.index] = attachment
        },
        deleteAttachment: (state, action) => {
            state.attachment.splice(action.payload, 1);
        },
        addLocationType: (state, action) => {
            state.locationType = action.payload
        },
        addCollTypeType: (state, action) => {
            state.collTypeType = action.payload
        },
        addItemStatusType: (state, action) => {
            state.itemStatusType = action.payload
        },
        addSupplierType: (state, action) => {
            state.supplierType = action.payload
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        addItem: (state, action) => {
            state.item.push(action.payload)
        },
        editItem: (state, action) => {
            let item = { ...action.payload };
            delete item["index"]

            state.item[action.payload.index] = item
        },
        deleteItem: (state, action) => {
            state.item.splice(action.payload, 1);
        },
        addBiblioType: (state, action) => {
            state.biblioType = action.payload
        },
        setRelation: (state, action) => {
            state.relation = action.payload;
        },
        addRelation: (state, action) => {
            state.relation.push(action.payload)
        },
        editRelation: (state, action) => {
            let relation = { ...action.payload };
            delete relation["index"]

            state.relation[action.payload.index] = relation
        },
        deleteRelation: (state, action) => {
            state.relation.splice(action.payload, 1);
        },
    },
});

export const {
    addAuthorType,
    setAuthor,
    addAuthor,
    editAuthor,
    deleteAuthor,
    addGMDType,
    addContentTypeType,
    addMediaTypeType,
    addCarrierTypeType,
    addFrequencyType,
    addPublisherType,
    addPlaceType,
    addTopicType,
    setTopic,
    addTopic,
    editTopic,
    deleteTopic,
    addLanguageType,
    setAttachment,
    addAttachment,
    editAttachment,
    deleteAttachment,
    addLocationType,
    addCollTypeType,
    addItemStatusType,
    addSupplierType,
    setItem,
    addItem,
    editItem,
    deleteItem,
    addBiblioType,
    setRelation,
    addRelation,
    editRelation,
    deleteRelation,
    addItemCodePatternType
} = formBibliographySlice.actions;

export default formBibliographySlice.reducer;
