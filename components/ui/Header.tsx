import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    router.push('/api/auth/signin');
  };

  return (
    <nav className="absolute w-full top-0 z-10 flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        
      </div>
      {session ? (
        <div className="flex items-center">
          <p className="text-gray-100 mr-4">Hi there! {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="rounded-lg p-2 border border-black transition duration-300 bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384] text-white focus:outline-none"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="rounded-lg p-2 border border-black transition duration-300 bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384] text-white focus:outline-none"
        >
          Sign In
        </button>
      )}
    </nav>
  );
};

export default Header;
