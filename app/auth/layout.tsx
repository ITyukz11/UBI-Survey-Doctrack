'use client'
import { Label } from '@/components/ui/label'
import { AnimatePresence, motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import {  FaLongArrowAltLeft } from 'react-icons/fa'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('/result-background.png')" }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
      >
        <div className='h-screen flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-screen'
          style={{ backgroundImage: "url('/background.png')" }}>
              <Label className=' cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-x-2' onClick={()=> router.push('/')}>
     
     <p className='text-white flex flex-row mb-4 gap-2 w-96'> <FaLongArrowAltLeft /> Home</p>
      </Label>
          {children}
   

        </div>
    
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthLayout;
