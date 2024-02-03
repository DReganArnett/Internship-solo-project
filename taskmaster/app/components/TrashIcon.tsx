import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData{
    id: number;
}

const TrashIcon = () => {
    const router = useRouter();
    const { handleSubmit } = useForm<FormData>()
    
    return (
        <div>
            <form>
                <button 
                    type='submit' 
                    className='p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg'
                    onSubmit={handleSubmit (async (id) => {
                        try {
                            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                                method: "DELETE",
                                body: JSON.stringify(id)  
                            });
                            return response.json();
                        } catch (error) {
                            throw new Error('Unable to delete task.');
                        }
                    })}> 
                    <FaRegTrashCan className='fill-current text-white'/>
                </button>
            </form>
            
           
        </div>
  )
}

export default TrashIcon