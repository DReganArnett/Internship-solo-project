import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

const DeleteIcon = (id:number) => {
    return (
        <div>
            <span className="mt-3 inline">
                <button 
                    type='submit'
                    className='p-3 bg-amber-500 hover:bg-amber-700 hover:cursor-pointer rounded-lg'
                    onSubmit={ async (id) => {
                        try {
                            await fetch(`http://localhost:3000/api/tasks/${id}`,{
                                method:"DELETE",
                                    headers:{"Content-Type":"application/json"},
                                }).then(()=>{
                                    window.location.reload();
                                })
                            
                        } catch (error) {
                            throw new Error('Unable to delete task.');
                        }
                    }}
                >  
                    <FaRegTrashCan 
                        className='fill-current text-white'>
                    </FaRegTrashCan>
                </button>
            </span>         
        </div>
  )
}

export default DeleteIcon