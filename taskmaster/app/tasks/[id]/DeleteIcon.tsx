'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '@radix-ui/themes';
import { FaRegTrashCan } from 'react-icons/fa6'

interface Props {
    id: string
}

const DeleteIcon = ({id}: Props) => {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteTask = async () => {
        try {
            console.log("TRYING TO DELETE")
            setDeleted(true)
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            router.push('/tasks');
            router.refresh();
        } catch (error) {
            setDeleted(false);
            setError(true);
        }
    };

    return (
        <div>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button 
                        className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                        disabled={deleted}
                    >
                        <FaRegTrashCan className='fill-current text-white' />
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this task?
                    </AlertDialog.Description>
                    <AlertDialog.Cancel>
                        <button 
                            className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                        >
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <button
                            className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                            onClick={deleteTask}
                        >
                            Delete
                        </button>
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        Unable to delete task.
                    </AlertDialog.Description>
                    <button 
                        className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                        onClick={() => setError(false)}
                    >
                        Okay
                    </button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    );
};

export default DeleteIcon;