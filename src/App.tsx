import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingScreen } from '@/components/common/LoadingScreen';
import { RootLayout } from '@/layouts/RootLayout';
import { routes } from '@/constants/routes';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const App = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.products} element={<Products />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);
