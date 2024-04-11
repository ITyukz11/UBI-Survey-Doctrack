'use client'
import React from 'react'
import { Label } from './ui/label'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

type Props = {}

export const BackHomeButton = (props: Props) => {
    const router = useRouter()
    return (
        <Label className=' cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-x-2' onClick={() => router.push('/')}>

            <p className='text-white flex flex-row mb-4 gap-2 w-96'> <FaLongArrowAltLeft /> Home</p>
        </Label>
    )
}

