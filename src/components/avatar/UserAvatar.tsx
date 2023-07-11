import { User } from 'firebase/auth';
import React from 'react';

type Props = {
  user: User;
};

export default function UserAvatar({ user: { photoURL, displayName } }: Props) {
  return (
    <div className="flex items-center shrink-0">
      {photoURL && displayName && (
        <img src={photoURL} alt={displayName} className="w-10 h-10 rounded-full mr-2" />
      )}{' '}
      <span className="hidden md:block">{displayName}</span>{' '}
    </div>
  );
}
