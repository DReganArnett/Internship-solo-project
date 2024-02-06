import React from 'react'
import { NextResponse } from 'next/server';
import { Callout } from '@radix-ui/themes';
import { taskSchema } from '@/app/validationSchemas';
import  { z } from 'zod';
import { getTaskById, updateTask } from '@/app/api/apiCalls';
import UpdateTaskForm from '@/app/components/UpdateTaskForm';
import { useRouter } from 'next/navigation';


type updateTaskForm = z.infer<typeof taskSchema>;

interface Props {
    id: number
    taskName: string
    dueOn: string
    completed: boolean
}

const UpdateTaskPage = async ({id, taskName, dueOn, completed}: Props) => {

    let error;

    const task  = await getTaskById(id);
    
    const submitUpdates = async (params:{id: number, dueOn: string, completed: boolean}) => {
        const router = useRouter();
      
        //Fetch from DB
        const task = await fetch(`http://localhost:3000/api/${params.id}`, {
          cache: "no-store",
        }); 
         //If not found return 404, else return actual data
        if (!task){
            return NextResponse.json({error: 'Task not found'},{status: 404})
        }

        try {
          const { taskName, dueOn, completed } = await task.json();
          const updatedTask = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "PUT", 
            body: JSON.stringify({dueOn, completed}),
            headers: {"Content-Type": "application/json"},
          });  
          router.push('/tasks');
          return NextResponse.json(updatedTask, { status: 200 })
        } catch (error) {
          return NextResponse.json({message: 'Unable to update task.', error}, { status: 500 })
        }
    }
   
  return (

    <div>  
        {error && 
            <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <UpdateTaskForm task={task} submitUpdates={function (): void {}}  />  
       
    </div>
  )
}

export default UpdateTaskPage;

