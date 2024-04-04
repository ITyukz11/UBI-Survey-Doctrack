import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})

interface LoginModalProps {
  openModal: boolean;
  closeModal: () => void;
}

export default function LoginModal({ openModal, closeModal }: LoginModalProps) {
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-center align-middle shadow-xl transition-all
                                bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400 to-orange-800 space-y-6 ">
                <Dialog.Title
                  as="h3"
                  className={cn("text-6xl font-semibold drop-shadow-md leading-6 text-black pt-5",font.className)}>
                🔐 Sign In
                </Dialog.Title>
                <p className="text-black text-lg">This is for UBI Survey Department only!</p>
                <div className="space-y-6 ">
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full h-10 pl-3 pr-10 rounded-lg bg-gradient-to-r from-yellow-200 to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full h-10 pl-3 pr-10 rounded-lg bg-gradient-to-r from-yellow-200 to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                  <LoginButton>
                    <Button variant={'secondary'} size="lg">
                      Ay for the go!
                    </Button>
                  </LoginButton>
                  </div>
              
                
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
