import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Countries } from '../pages/Countries';

export interface AppRoute {
  name: string;
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

export const routes: AppRoute[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
  },
  {
    name: 'Countries',
    path: '/countries',
    element: <Countries />,
  },
];
