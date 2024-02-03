"use client"

import React, { useState } from 'react'
import { Text, Flex, Checkbox, Callout, Heading } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/app/validationSchemas';
import { date, z } from 'zod';

import { useRouter } from 'next/navigation';

// type TaskForm = z.infer<typeof taskSchema>;



type FormData = {
    id: number
    taskName: string
    dueOn: string
    completed: boolean
}

interface Props {
    id: number
    taskName: string
    dueOn: string
    completed: boolean
}

const NewTaskPage = ({id, taskName, dueOn, completed}: Props) => {
    const router = useRouter()
    const {register, control, handleSubmit, formState: {errors}} =  useForm<FormData>({ defaultValues: {completed: false}});
    
    let error;

  return (

    <div>
        <Heading size="7" as="h1" className='text-black'>{taskName}</Heading>
        {error && 
            <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        
        <form 
            name="TaskForm"
            className='space-y-3' 
            onSubmit = {handleSubmit (async (data) => { 
                try {
                    const response = await fetch(`http://localhost:3000/api/tasks`, {
                        method: "POST",
                        cache: "no-cache",
                        body: JSON.stringify(data)
                    });
                    const tasks = response.json();
                    router.push('/tasks')
                    return tasks;    
                } catch (error) {
                        throw new Error('Unable to post new task.');
                }
            })}>
            <input type='text' required placeholder="Task Name: " className='w-96 p-1 border-solid border-gray-300 border-2 text-black max-w-lg rounded-lg placeholder:text-gray-500' {...register('taskName')}></input>
            <br />
            <input type="text" required placeholder="Due On: " className='w-96 p-1 border-solid border-gray-300 border-2 text-black max-w-lg rounded-lg placeholder:text-gray-500' {...register('dueOn')}></input>
            <div className="w-96 p-1 border-2 border-gray-300 max-w-lg rounded-lg text-gray-500">Completed <input type="checkbox" {...register('completed')} /></div>
            <br />
            <button className="p-2 bg-gray-500 hover:bg-gray-700 rounded text-white">Submit New Task</button>
        </form>
    </div>
  )
}

export default NewTaskPage