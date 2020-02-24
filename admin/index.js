import Static1 from './pages/static-1';

export default {
    pages: () => [
        {
            label: 'Main static page 1',
            path: 'static-1',
            component: Static1,
        },
        {
            label: 'Dynamic pages',
            children: ['Todo', 'ListWithPlugin'],
        },
        {
            label: 'Static pages',

            children: [{
                label: 'Static page 1',
                path: 'static-1',
                listKey: 'Post',
                component: Static1,
            }],
        },
    ],
};