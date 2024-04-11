import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Button } from './ui/button'
import { FaCopyright } from 'react-icons/fa'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Label } from './ui/label'

interface CreditsDialogProps {
    openDialog: boolean,
    closeDialog: () => void
}

export const CreditsDialog = ({ openDialog, closeDialog }: CreditsDialogProps) => {

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
                                    <StarFilledIcon /><StarFilledIcon /><StarFilledIcon />Credits <StarFilledIcon /><StarFilledIcon /><StarFilledIcon />

                                </Dialog.Title>
                                <Dialog.Description>
                                <p>This system was built by the following individuals for the <b>Survey Engineer Department of Ulticon Inc.</b></p>
                                <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src="/programmer.jpeg" alt="Errol Robyn M. Abella" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }} />
                                        <div>
                                            <strong>Errol Robyn M. Abella</strong><br />
                                            Full Stack Developer
                                        </div>
                                    </div>
                                    <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src="/janela.jpg" alt="April Rosse C. Cuizon" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }} />
                                        <div>
                                            <strong>April Rosse C. Cuizon</strong><br />
                                            Web Designer / Canva / Figma / Adobe Photoshop
                                        </div>
                                    </div>
                                </Dialog.Description>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
