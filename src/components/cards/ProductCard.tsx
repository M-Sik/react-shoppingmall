import React from 'react';
import { Product } from '../../types/Product';

type Props = {
  product: Product & { id: string; image: string };
};

export default function ProductCard({ product: { id, image, title, category, price } }: Props) {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
}
