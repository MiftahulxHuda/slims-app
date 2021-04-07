export const DRAWER_ITEMS = [
    {
        key: 'bibliography',
        title: 'Bibliography',
        icon: 'sign-out-alt',
        routeName: 'Bibliography'
    },
    {
        key: 'authority_files',
        title: 'Authority Files',
        icon: 'sign-out-alt',
        routeName: 'Bibliography'
    },
    {
        key: 'lookup_files',
        title: 'Lookup Files',
        icon: 'sign-out-alt',
        routes: [
            {
                key: 'place',
                title: 'Place',
                icon: 'sign-out-alt',
                routeName: 'Bibliography'
            },
            {
                key: 'item_status',
                title: 'Item Status',
                icon: 'sign-out-alt',
                routeName: 'ItemStatus'
            },
        ]
    },
    {
        key: 'sign_out',
        title: 'Sign Out',
        icon: 'sign-out-alt',
        routeName: 'Bibliography'
    },
];
