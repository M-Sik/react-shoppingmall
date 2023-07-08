import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { User } from 'firebase/auth';
import UserAvatar from '../avatar/UserAvatar';

export default function Navbar() {
  const [user, setUser] = useState<User | void>();
  const handleLogin = () => {
    login().then((user) => setUser(user));
  };
  const handleLogout = () => {
    logout().then((user) => setUser(user));
  };
  // 마운트 될때 유저에 대한 정보를 가져옴
  useEffect(() => {
    onUserStateChange((user: User) => {
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
        <Link to="/products/new" className="text-2xl">
          <BsFillPencilFill />
        </Link>
        {!user || <UserAvatar user={user} />}
        {!user && <button onClick={handleLogin}>Login</button>}
        {!user || <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
