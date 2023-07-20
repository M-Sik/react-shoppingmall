import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import UserAvatar from '../avatar/UserAvatar';
import Button from '../button/Button';
import { useAuthContext } from '../../context/AuthContext';
import CartStatus from '../badge/CartStatus';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {!user || (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {!user ||
          (user.isAdmin && (
            <Link to="/products/new" className="text-2xl">
              <BsFillPencilFill />
            </Link>
          ))}
        {!user || <UserAvatar user={user} />}
        {!user && <Button text="Login" onClick={login} />}
        {!user || (
          <Button
            text="Logout"
            onClick={() => {
              logout();
              navigate(0);
            }}
          />
        )}
      </nav>
    </header>
  );
}
