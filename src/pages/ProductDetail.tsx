import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types/Product';

type RouteState = {
  state: {
    product: Product & { id: string; image: string };
  };
};

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation() as RouteState;
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const handleClick = () => {
    // 장바구니에 추가하면됨
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img src={image} alt={title} className="w-full px-4 basis-7/12" />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">{price}원</p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션:
            </label>
            <select
              id="select"
              onChange={handleSelect}
              value={selected}
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
            >
              {options &&
                typeof options !== 'string' &&
                options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          <button
            className="bg-brand text-white rounded-lg py-3 px-4 font-bold"
            onClick={() => handleClick}
          >
            장바구니 담기
          </button>
        </div>
      </section>
    </>
  );
}
