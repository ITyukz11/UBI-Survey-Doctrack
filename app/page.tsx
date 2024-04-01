import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-5 lg:p-24 border-2 border-black" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
  <div className="flex text-black flex-wrap z-10 min-w-fit max-w-5xl lg:w-[65%] items-center right-auto justify-between font-mono text-sm lg:flex border-2 border-black rounded-3xl overflow-hidden bg-white bg-opacity-25 p-2 md:p-16">
    <div className="flex flex-col">
      <Image src='/UBI_Logo.jpg' height={100} width={100} alt='UBI Logo' />
      <h1 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">ULTICON BUILDERS, INC.</h1>
          <h3 className="text-base sm:text-sm md:text-base mb-10">QUADRUPLE &apos;A&apos; GENERAL CONTRACTOR</h3>
          <h2 className="font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl" style={{ fontFamily: 'Segoe Script' }}>Welcome to</h2>
          <h1 className="font-black text-lg sm:text-xl md:text-3xl lg:text-4xl mb-4 md:mb-10" >Survey Section Document Tracker</h1>
          <div className="flex flex-row w-full rounded-md gap-1">
            <div className="flex flex-row w-full relative lg:flex-wrap overflow-hidden z-10">
              <input type="text" className="px-4 py-2 pr-8 w-full min-w-32 mb-2 rounded-md bg-white bg-opacity-50 text-black border border-black outline-none" placeholder="Looking for..." />
              <div className="absolute right-0 cursor-pointer rounded-tr-md rounded-br-md p-[11px] border-t border-r border-b border-black transition duration-300 bg-gradient-to-r from-yellow-300 to-orange-500 hover:to-yellow-300">
  <FaSearch className="text-black" />
</div>


            </div>
            <select className="px-4 py-2 mb-2 rounded-md bg-white bg-opacity-50 text-black border border-black outline-none cursor-pointer">
              <option value="data">Data</option>
              <option value="surveyor">Surveyor</option>
              <option value="inventory">Inventory</option>
            </select>
      </div>
      
    </div>
  </div>
</main>

  );
}
