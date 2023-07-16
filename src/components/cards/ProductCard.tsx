import React from 'react';
import { Product } from '../../types/Product';

type Props = {
  product: Product & { id: string; image: string };
};

export default function ProductCard({ product: { id, image, title, category, price } }: Props) {
  return (
    <li className="rounded-lg shadow-md overflow-hidden cursor-pointer">
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg">
        <h3 className="font-bold truncate">{title}</h3>
        <p className="text-brand font-semibold">{`${price}원`}</p>
      </div>
      <p className="my-2 px-2 text-gray-500">{category}</p>
    </li>
  );
}
