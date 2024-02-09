import React from 'react'
import Link from 'next/link';
import { TfiPencil } from 'react-icons/tfi';

const EditIcon = ({ taskId }: {taskId: number }) =>  {
    return (
        <div>
            <button className="p-3 mt-3 bg-yellow-900 hover:bg-amber-700 hover:cursor-pointer rounded-lg">
                <Link href='/tasks/update'>
                    <TfiPencil className="fill-current text-white"/>
                </Link>
            </button>
        </div>
  )
}

export default EditIcon;