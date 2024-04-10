import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './button';
import { DropDownMenuComponent } from '../drop-down-menu';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <nav className="fixed w-full top-0 z-10 flex justify-between items-center py-2 px-8 bg-black">
      <div className="flex items-center">

      </div>
      {session.status === 'authenticated' ? (
        <div className="flex items-center">
          <p className="text-gray-100 mr-4">Hi there!</p>
        <DropDownMenuComponent/>
        </div>
      ) : (

        <Button
          variant='outline'
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}
    </nav>
  );
};

export default Header;
