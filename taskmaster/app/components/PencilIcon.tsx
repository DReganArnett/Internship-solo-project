"use client"

import React from 'react'
import Link from 'next/link';
import { TfiPencil } from 'react-icons/tfi'

const PencilIcon = () => {
  return (
    <div>
        <button className="p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
            <Link href='/tasks/update'>
                <TfiPencil className="fill-current text-white"/>
            </Link>
        </button>
    </div>
  )
}

export default PencilIcon