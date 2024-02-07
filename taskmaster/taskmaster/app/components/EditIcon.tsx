import React from 'react'
import Link from 'next/link';
import { TfiPencil } from 'react-icons/tfi';

const EditIcon = () =>  {
    return (
        <div>
            <span className="mr-3 inline">
                <button className="p-3 bg-amber-500 hover:bg-amber-700 hover:cursor-pointer rounded-lg">
                    <Link href='/tasks/update'>
                        <TfiPencil className="fill-current text-white"/>
                    </Link>
                </button>
            </span>
        </div>
  )
}

export default EditIcon;