import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6'
import prisma from '@/prisma/client';
import { deleteTask } from '../api/apiCalls';

type Props = {
    id:number
}

const DeleteIcon = ({id}: Props) => {
    return (
        <div>
           
            <button 
                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                onClick={() => {deleteTask}}
            >
                <FaRegTrashCan className='fill-current text-white'/>
            </button>
          
        </div>
  )
}

export default DeleteIcon