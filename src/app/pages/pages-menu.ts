import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Famous Token Allocations',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Uniswap',
        link: '/pages/uniswap-allocation',
      },
      {
        title: 'Compound',
        link: '/pages/compound-allocation',
      },
    ],
  },
];
