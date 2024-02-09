"use client"

import React, { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingSpinner from '@/app/components/Spinner';
import { updateTaskSchema } from '@/app/validationSchemas';
import axios from 'axios';
import { Task } from '@prisma/client';
import { useForm } from  'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type UpdateTaskFormData = z.infer<typeof updateTaskSchema>

const UpdateTaskForm = ({ task }: {task: Task}) => {
    const router = useRouter();
    const {
        handleSubmit,
        register, 
        formState: { errors }
    } = useForm<UpdateTaskFormData>({ resolver: zodResolver(updateTaskSchema) });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
   
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitted(true);
            await axios.put('/api/tasks' + task.id, data);
            router.push('/tasks');
            router.refresh();
        } catch (error) {
            setSubmitted(false);
            setError('Unable to update this task.');
        }
    });

    return (
        <div>
            <div className='image-container'>
                <div className='p-4 ml-8'>
                    <h1 className='mb-2 text-2xl text-white'>Update {task.taskName}: </h1>  
                    {error && (
                        <Callout.Root color="red" className="mb-5">
                            <Callout.Text>{error}</Callout.Text>
                        </Callout.Root>
                    )};
                    <form 
                        name="updateTaskForm"
                        className='space-y-3'>  
                         <input 
                            type='text' 
                            placeholder="taskName: " 
                            defaultValue={task.taskName}
                            className="w-96 p-1 border-2 border-yellow-900 opacity-75 rounded-lg text-yellow-950 placeholder:text-yellow-950" 
                            {...register('taskName')}
                        />
                        <div>
                            <ErrorMessage>{errors.taskName?.message}</ErrorMessage>
                        </div>      
                        <input 
                            type='text' 
                            placeholder="Due On (YYY-DD-MM): " 
                            defaultValue={task.dueOn}
                            className="w-96 p-1 border-2 border-yellow-900 opacity-75 rounded-lg text-yellow-950 placeholder:text-yellow-950" 
                            {...register('dueOn')}
                        />
                         <div>
                            <ErrorMessage>{errors.dueOn?.message}</ErrorMessage>
                        </div>  
                        <button 
                            className="p-1 bg-white border-2 border-yellow-900 opacity-75 hover:bg-yellow-700 rounded-xl text-yellow-900"
                            disabled={submitted}>
                            {submitted && <LoadingSpinner />}
                                Update Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskForm;

{/* <div className='p-1 bg-white opacity-75 border-2 border-yellow-950  w-96 rounded-lg'>
<label htmlFor='checkBox' className="text-yellow-900">Completed: </label>
<input 
    className="border-yellow-900"
    type='checkbox'
    name='checkBox'
    // checked={task.completed}
    // onChange={(e) => setCompleted(!completed)}
/>
</div> */}