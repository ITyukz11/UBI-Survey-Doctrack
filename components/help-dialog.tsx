import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { MdHelp } from 'react-icons/md'
import { Button } from './ui/button'

interface HelpDialogProps {
    openDialog: boolean,
    closeDialog: () => void
}

export const HelpDialog = ({ openDialog, closeDialog }: HelpDialogProps) => {

    return (
        <Transition appear show={openDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDialog} >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="flex flex-row justify-center items-center gap-1 text-lg mb-4 font-medium leading-6 text-gray-900"
                                >
                                    Help<MdHelp />

                                </Dialog.Title>
                                <Dialog.Description>
  <strong>Need Assistance?</strong>
  <p>
    For any inquiries or assistance regarding the system, please don&apos;t hesitate to reach out to our dedicated support team. Your satisfaction and success are our top priorities, and we&apos;re here to help you every step of the way.
  </p>
  <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
  <p>Contact Information:</p>
  <ul>
    <li>
      <strong>Errol Robyn M. Abella</strong><br />
      Email: <a href="mailto:it.era0211@gmail.com" style={{ color: '#007bff' }}>it.era0211@gmail.com</a><br />
      Phone: +63 991-792-2755
    </li>
    <li>
      <strong>April C. Cuizon</strong><br />
      Email: <a href="mailto:sam@example.com" style={{ color: '#007bff' }}>aprylrossecagata@gmail.com</a><br />
      Phone: +63 945-423-2573
    </li>
  </ul>
  <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
  <p>For project-related inquiries or broader assistance, you can also contact:</p>
  <ul>
    <li>
      <strong>Sam M. Montaner</strong><br />
      Email: <a href="mailto:surveydept2018@gmail.com" style={{ color: '#007bff' }}>surveydept2018@gmail.com</a><br />
    </li>
  </ul>
  <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
  <p>
    Our team is committed to providing you with prompt and effective support to ensure your experience with our system is seamless and productive. Don&apos;t hesitate to get in touch with us if you have any questions or require assistance.
  </p>
</Dialog.Description>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
