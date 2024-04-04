'use client'
import Link from 'next/link';
import React from 'react';
import { FaBackward } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const Page: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen h-screen mx-auto p-8"
        style={{ backgroundImage: "url('/logs-background.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col justify-between mx-auto p-8 ">               
        <table className="w-full rounded-xl border-white border-solid overflow-hidden text-white">

              <thead className="bg-[#16273f]">
                <tr>
                  <th className="py-2 px-4 border border-white">Date</th>
                  <th className="py-2 px-4 border border-white">Time</th>
                  <th className="py-2 px-4 border border-white">Person</th>
                  <th className="py-2 px-4 border border-white">Activity</th>
                </tr>
              </thead>
              <tbody className="bg-[#314557]">
                <tr>
                  <td className="py-2 px-4 border border-white">April 3, 2024</td>
                  <td className="py-2 px-4 border border-white">3:20PM / 3:50PM</td>
                  <td className="py-2 px-4 border border-white">April Cagata</td>
                  <td className="py-2 px-4 border border-white">23KO-0077_Plan&Profile</td>

                </tr>
                <tr>
                  <td className="py-2 px-4 border border-white">April 8, 2024</td>
                  <td className="py-2 px-4 border border-white">1:20PM / 3:52PM</td>
                  <td className="py-2 px-4 border border-white">Yuki Abella</td>
                  <td className="py-2 px-4 border border-white">Updated 23KO-0077_Plan&Profile</td>
                </tr>
              </tbody>
            </table>
      


        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
