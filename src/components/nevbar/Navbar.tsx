import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { User } from 'firebase/auth';
import UserAvatar from '../avatar/UserAvatar';
import { ShopUser } from '../../types/User';
import Button from '../button/Button';

export default function Navbar() {
  const [user, setUser] = useState<ShopUser | void>();
  // 마운트 될때 유저에 대한 정보를 가져옴
  useEffect(() => {
    onUserStateChange((user: ShopUser) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        {!user ||
          (user.isAdmin && (
            <Link to="/products/new" className="text-2xl">
              <BsFillPencilFill />
            </Link>
          ))}
        {!user || <UserAvatar user={user} />}
        {!user && <Button text="Login" onClick={login} />}
        {!user || <Button text="Logout" onClick={logout} />}
      </nav>
    </header>
  );
}
