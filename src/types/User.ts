import { User } from 'firebase/auth';

export type ShopUser = User & { isAdmin?: boolean };
