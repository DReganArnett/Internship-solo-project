"use client"

import React, { useState } from 'react'
import { Callout, Heading } from '@radix-ui/themes';
import { taskSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type TaskForm = z.infer<typeof taskSchema>;


const NewTaskPage = () => {
    const router = useRouter()
    const [taskName, setTaskName] = useState('');
    const [dueOn, setDueOn] = useState('');
    const [completed, setCompleted] = useState(false);

    let error;

    const submitTask = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3000/api/tasks", {
                method: "POST", 
                body: JSON.stringify({taskName, dueOn, completed}),
                headers: {"Content-Type": "application/json"},
            });
            router.push("/tasks");
        } catch (error) {
            throw new Error('Unable to post task.');
        }
    };

  return (

    <div>
        <h1 className='mb-2 text-2xl text-black'>Create a Task: </h1>
        {error && 
            <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        
        <form 
            action = ''
            name="TaskForm"
            className='space-y-3'>
            <input 
                type='text' 
                required 
                placeholder="Task Name: " 
                className='w-96 p-1 border-solid border-gray-300 border-2 text-black max-w-lg rounded-lg placeholder:text-gray-500'
                onChange={(e) => setTaskName(e.target.value)}
            />
            <br />
            <input 
                type="text" 
                required 
                placeholder="Due On: "
                className='w-96 p-1 border-solid border-gray-300 border-2 text-black max-w-lg rounded-lg placeholder:text-gray-500' 
                onChange={(e) => setDueOn(e.target.value)}
            />
            <br />
            <button 
                className="p-2 bg-gray-500 hover:bg-gray-700 rounded text-white"
                onClick={submitTask}
            >
                Submit New Task
            </button>
        </form>
    </div>
  )
}

export default NewTaskPage