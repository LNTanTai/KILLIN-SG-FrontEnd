import React from 'react'
import { useRoutes } from 'react-router-dom'
import { CartPage, HomePage, ProductDetailPage } from '../services/constants/pageConstants';
import { CART_PATH, HOMEPAGE_PATH, PRODUCT_DETAIL_PATH } from '../services/constants/pathConstants';

export default function Routes() {
  return useRoutes([
    { path: HOMEPAGE_PATH, element: <HomePage /> },
    { path: PRODUCT_DETAIL_PATH, element: <ProductDetailPage /> },
    { path: CART_PATH, element: <CartPage /> },
]);
}
