import React from 'react';
import Link from 'next/link';import { useForm } from 'react-hook-form';
import { TfiPencil } from 'react-icons/tfi'
import { FaRegTrashCan } from 'react-icons/fa6';

interface Props {
    id: Number
}

const Buttons = ({id}: Props) => {
    
    return (
        <>
            <span className="mr-3 inline">
                <button className="p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                    <Link href='/tasks/update'>
                        <TfiPencil className="fill-current text-white"/>
                    </Link>
                </button>
            </span>
            <span className="mt-3 inline">
                <button 
                    className='p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg'
                    onClick={async()=>{
                        try {
                            const confirmed = confirm("Are you sure you want to delete this task?")
                            if(confirmed ){
      
                               await fetch(`http://localhost:3000/api/tasks?id=${id}`,{
                                   method:"DELETE",
                                   headers:{"Content-Type":"application/json"},
                               }).then(()=>{
                                   window.location.reload();
                               })
                               
                              }
                          } catch (error) {
                              console.log("Error deleting task: ", error);
                          }
                      }}
                    // onSubmit={handleSubmit(async (id) => {
                    //     try {
                    //         const response = await fetch(`http://localhost:3000/api/tasks/id`, {
                    //         method: "DELETE",
                    //             body: JSON.stringify(id)  
                    //         });
                    //             return response.json();
                    //     } catch (error) {
                    //         throw new Error('Unable to delete task.');
                    //     }
                    // })}
                   >  
                        <FaRegTrashCan 
                            className='fill-current text-white'>
                        </FaRegTrashCan>
                </button>
            </span>   
        </>
    );
}

export default Buttons