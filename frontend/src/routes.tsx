import { RouteObject } from 'react-router-dom';
import Layout from '@/layouts';
import Home from '@/pages/home';
import NotFound from '@/pages/404';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: '*', 
        element: <NotFound /> 
      }
    ]
  }
];

export default routes;