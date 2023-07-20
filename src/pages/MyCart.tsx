import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import CartItem from '../components/CartItem';
import PriceCard from '../components/cards/PriceCard';

const SHIPPING = 3000;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery<any>(['carts'], () => getCart(uid ? uid : ''));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev: any, current: any) => prev + parseInt(current.price) * current.quantity,
      0,
    );

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8">
            {products &&
              products.map((product: any) => (
                <CartItem key={product.id} uid={uid ? uid : ''} product={product} />
              ))}
          </ul>
          <div className="flex justify-between items-center px-2 md:px-8">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <button className="bg-brand text-white py-3 px-4 font-bold rounded-lg mt-8">
            주문 하기
          </button>
        </>
      )}
    </section>
  );
}
