'use client'
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LoginModal from "./loginmodal";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/Header";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();
  const session = useSession();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        // Prevent default behavior of form submission
        e.preventDefault();
        // Show the alert dialog
        authGuard();
    }
  };

  const authGuard = async () => {

    if (session.status === 'loading') return; // Skip if session status is still loading

    if (session.status === 'unauthenticated') {
      setShowAlert(true)
    } 
    if(session.status === 'authenticated') {
      await router.push(`/documents/result?search=${searchValue}`);
      // Fetch documents if the user is authenticated
    }
  }


  console.log(session)
  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
      >
        <main className="flex min-h-screen flex-col justify-center " style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          {/* Sign In button */}
          <Header/>
          {/* {session.status != 'authenticated' ?
            <Button
              className="absolute right-5 top-5 cursor-pointer rounded-lg p-2 border border-black transition duration-300 bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384]"
              onClick={() => router.push('/auth/login')} // Open the modal when button is clicked
            >
              Sign In
            </Button> : <div className="absolute right-5 top-5 font-bold flex items-center flex-row gap-5">
               <Label>Welcome! </Label>
              <Label className=" font-bold">{session.data?.user?.name}</Label>
              <Button onClick={() => signOut()}>
                Logout
              </Button>
            </div>} */}
          {/* {showAlert && <ShowAlert label="Please login first to search" />} */}
          {/* Render LoginModal if isModalOpen is true */}

          <div className="flex text-black  m-5 lg:m-24 flex-wrap z-10 min-w-fit max-w-5xl lg:w-[65%] items-center right-auto justify-between font-mono text-sm lg:flex border-2 border-black rounded-3xl overflow-hidden bg-white bg-opacity-25 p-2 md:p-16">
            <div className="flex flex-col">
              <Image src='/UBI_Logo.jpg' height={100} width={100} alt='UBI Logo' />
              <h1 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">ULTICON BUILDERS, INC.</h1>
              <h3 className="text-base sm:text-sm md:text-base mb-10">QUADRUPLE &apos;A&apos; GENERAL CONTRACTOR</h3>
              <h2 className="font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl" style={{ fontFamily: 'Segoe Script' }}>Welcome to</h2>
              <h1 className="font-black text-lg sm:text-xl md:text-3xl lg:text-4xl mb-4 md:mb-10" >Survey Section Document Tracker</h1>
              <div className="flex flex-row w-full rounded-md gap-1">
                <div className="flex flex-row w-full relative lg:flex-wrap overflow-hidden z-10">
                  <input
                    type="text"
                    className="px-4 py-2 pr-8 w-full min-w-32 mb-2 rounded-md bg-white bg-opacity-50 text-black border border-black outline-none"
                    placeholder="Looking for..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <AlertDialog open={showAlert} onOpenChange={setShowAlert} >
                    
                    <div
                      className="absolute right-0 cursor-pointer rounded-tr-md rounded-br-md p-[11px] border-t border-r border-b border-black 
                      transition duration-300 bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384]"
                      onClick={authGuard}>
                      <FaSearch className="text-black" />
                    </div> 
                    
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-row items-center gap-2">
                          <ExclamationTriangleIcon className=" text-red-500"/> Login Required for UBI Document Tracking System
                          </AlertDialogTitle>
                        <AlertDialogDescription>
                        To access the features of the Ulticon Builders Inc. (UBI) Document Tracking System, you need to log in with your credentials. Please log in to proceed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={()=> setShowAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=> router.push('/auth/login')}>Login</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* <div
                      className="absolute right-0 cursor-pointer rounded-tr-md rounded-br-md p-[11px] border-t border-r border-b border-black transition duration-300 bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384]"
                      onClick={authGuard}
                    >
                      <FaSearch className="text-black" />
                    </div> */}


                </div>
                <select className="px-4 py-2 mb-2 rounded-md bg-white bg-opacity-50 text-black border border-black outline-none cursor-pointer">
                  <option value="data">Data</option>
                  <option value="surveyor">Surveyor</option>
                  <option value="inventory">Inventory</option>
                </select>
              </div>

            </div>
          </div>
          <LoginModal openModal={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
