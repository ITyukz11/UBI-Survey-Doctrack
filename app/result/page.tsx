'use client'
import Link from 'next/link';
import React, { Suspense, useEffect } from 'react';
import { FaBackward } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const ResultPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}

const ResultContent: React.FC = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');

  return (
   
      <AnimatePresence>
        <motion.div
          className="relative bg-cover bg-center bg-no-repeat min-h-screen"
          style={{ backgroundImage: "url('/result-background.png')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className="flex flex-col justify-between mx-auto p-8 h-screen">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-5xl font-semibold mb-16 p-2 bg-gradient-to-r from-white to-[#C39B40] text-center text-black rounded-lg">Result for:
                <span className="font-normal"> {searchValue}</span></h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                <div className="mb-8">
                  <p className="mb-2 font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Region: <span className="font-normal">Region XI</span></p>
                  <p className="mb-2 font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Contract ID: <span className="font-normal">ABCD2_1</span></p>
                </div>
                <div className="mb-8">
                  <p className="mb-2 font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Surveyor/Designer: <span className="font-normal">Yami Salutan</span></p>
                  <p className="mb-2 font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">File Location: <span className="font-normal">F:/File</span></p>
                </div>
              </div>
              <table className="w-full rounded-xl border border-white border-collapse overflow-hidden">
                <thead className="bg-[#c6b384]">
                  <tr>
                    <th className="py-2 px-4 border border-white">As-stake</th>
                    <th className="py-2 px-4 border border-white">Plan and profile</th>
                    <th className="py-2 px-4 border border-white">Accomplishments</th>
                  </tr>
                </thead>
                <tbody className="bg-[#d3c4a1]">
                  <tr>
                    <td className="py-2 px-4 border border-white">23KO-0077_as-stake</td>
                    <td className="py-2 px-4 border border-white">23KO-0077_Plan&Profile</td>
                    <td className="py-2 px-4 border border-white">23KO-0077_Accom as of March</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-white">23KO-0077_as-stake_Revise1</td>
                    <td className="py-2 px-4 border border-white">23KO-0077_Plan&Profile_revise1</td>
                    <td className="py-2 px-4 border border-white">23KO-0077_Accom as of March_Revise1</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
            <div className='mt-auto'>
              <Link href="/">
                <button
                  className="cursor-pointer rounded-lg p-2 border flex flex-row gap-1 items-center border-black bg-gradient-to-r from-[#c6b384] to-[#d3c4a1] hover:to-[#c6b384] transition duration-300  hover:-translate-x-2">
                  <FaBackward /> Back
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
 
  );
};

export default ResultPage;
