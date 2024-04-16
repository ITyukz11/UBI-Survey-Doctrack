import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { DataResultTable } from './data-result-table'
import axios from 'axios'

interface DialogResultProps {
    openDialog: boolean,
    closeDialog: () => void,
    searchValue: string,
    filter: string
}

export const DialogResult = ({ openDialog, closeDialog, searchValue,filter }: DialogResultProps) => {
    const [resultData, setResultData] = useState({})
    const fetchDocuments = async () => {
        try {
            // Construct the URL with the appropriate query parameter
            let url = `/api/documents?contract_id=${searchValue}`;

            // if (filter === 'data') {
            //     url = `/api/documents?contract_id=${searchValue}`;
            // } else if (filter === 'surveyor') {
            //     url = `/api/documents?designer=${searchValue}`;
            // }

            // Make the GET request using Axios
            const response = await axios.get(url);

            // Return the response data
            setResultData(response.data)
            return response.data;
        } catch (error) {
            // Handle any errors
            console.error('Error fetching documents:', error);
            throw error; // Optionally re-throw the error to be handled by the caller
        }
    };

    useEffect(() => {
 
            fetchDocuments()
            .then((data) => {
              console.log('Documents matching contract_id:', data);
            })
            .catch((error) => {
              console.error('Error fetching documents:', error);
            });
    }, [])


    return (
        <Transition appear show={openDialog} as={Fragment}>
           <Dialog as="div" className="relative z-10" onClose={closeDialog} static>
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
                <Dialog.Panel className="w-full w-max-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg text-center mb-4 font-medium leading-6 text-gray-900"
                    >
                        Result
                    </Dialog.Title>
                    <DataResultTable data={resultData} />
                </Dialog.Panel>
            </Transition.Child>
        </div>
    </div>
</Dialog>

        </Transition>
    )
}
