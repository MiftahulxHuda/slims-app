export default class DropdownComponent {
    onChangeType(url, sort, filter, keyItem, addType, typeDropDown) {
        // console.log(url, sort, filter, addType, typeDropDown)
        CRUDService.findAll(url, {
            take: 20,
            skip: 0,
            sort: sort,
            ...filter
        })
            .then((result) => {
                for (let index = 0; index < result.data.length; index++) {
                    const element = result.data[index];
                    result.data[index] = { label: element[keyItem.label], value: element[keyItem.value] }
                }

                addType(result.data)
                typeDropDown.current.setItemsFromPC(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                typeDropDown.current.setLoading();
            });
    }
}