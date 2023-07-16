import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/firebase';
import ProductCard from './cards/ProductCard';

export default function Products() {
  const { isLoading, error, data: products } = useQuery<any>(['products'], () => getProducts());
  console.log('??', products);

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {error && <p>error</p>}
      <ul>
        {products &&
          products.map((product: any) => <ProductCard key={product.id} product={product} />)}
      </ul>
    </>
  );
}
