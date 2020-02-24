import Dashboard from './pages/dashboard';
import About from './pages/about';

export default {
  pages: () => [
   {
      label: 'A new dashboard',
      path: '',
      component: Dashboard,
    },
    {
      label: 'About this project',
      path: '/about',
      component: About,
    },
    {
      label: 'Blog',
      children: [
        { listKey: 'Article' },
        { label: 'Categories', listKey: 'Proposal' },
      ],
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
};
