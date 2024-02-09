'use client'

import React, { useState } from 'react';
import prisma from '@/prisma/client';
import { useRouter } from 'next/navigation'
import { FaCheck } from 'react-icons/fa6';

interface Props {
  id: string
  completed: boolean
  toggleTask: (id:string, completed:boolean) => void
}

const CheckIcon = ({ id, completed, toggleTask}: Props) => {
  const router = useRouter()
  
  return (
    <div>
      <button
        className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
        onClick={() => toggleTask}
      >
        <FaCheck />
      </button> 
    </div>            
  )
}

export default CheckIcon;