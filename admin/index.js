import Dashboard from './pages/dashboard';
import About from './pages/about';

export default {
  pages: () => [
/*   {
      label: 'A new dashboard',
      path: '',
      component: Dashboard,
    },*/
    {
      label: 'About this project',
      path: '/about',
      component: About,
    },
    {
      label: 'Blog',
      children: [
        { listKey: 'Article' },
        { label: 'Proposed Articles', listKey: 'Proposal' },
        { label: 'Images', listKey: 'Image' },
        { label: 'YouTube Videos', listKey: 'YouTube' },
      ],
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
};
