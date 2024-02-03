'use client';

import React, { useState } from 'react'
import { TextField, Button, Text, Flex, Box, Checkbox, Callout, IconButton } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/app/validationSchemas';
import  { z } from 'zod';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";

type TaskForm = z.infer<typeof taskSchema>;


const UpdateTaskPage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} =  useForm<TaskForm>({
        defaultValues: {
            completed: false
        },
        resolver: zodResolver(taskSchema)
    });
    const [error, setError] = useState('');

  return (

    <div>  
        {error && 
            <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            
        <form 
            className='space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.put('/api/tasks', data);
                    router.push('/tasks')   
                } catch (error) {
                    setError('An unexpected error occured.');
                }
            })}>        
            <input type='text' placeholder="Task Name: " className='w-96 p-1 border-solid border-gray-300 border-2 text-black max-w-lg rounded-lg placeholder:text-gray-500'   {...register('taskName')} />
            <br />
            <input type='text' placeholder="Due On: " className="w-96 p-1 border-2 border-gray-300 max-w-lg rounded-lg text-gray-500 placeholder:text-gray-500" {...register('dueOn')} />
            <Controller
                name="completed"
                control={control}
                rules={{required: false}}
                render={({field}) => {
                    return  (
                        <Text size="3">
                            <Flex gap="2" className='mt-2 text-gray-500'>
                                Completed <Checkbox /> 
                            </Flex>
                        </Text>
                    
                    )}
                }
            />  
            <button className="p-2 bg-gray-500 hover:bg-gray-700 rounded text-white">Update Task</button>
        </form>
    </div>
  )
}

export default UpdateTaskPage