export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        component: '@/pages/editor',
        exact: true,
      },
      {
        path: '/editor/:id',
        component: '@/pages/editor',
        exact: true,
      },
    ],
  },
];
