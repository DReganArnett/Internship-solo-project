import React from 'react';
import { Heading } from '@radix-ui/themes'
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';
import TaskCard from '@/app/components/TaskCard';

async function getTasks (completed: boolean){
    "use server"
    return await prisma.task.findMany({where: { completed: false,}});
}

async function deleteAllTasks(data: FormData) {
    "use server"
    const id = data.get("id")?.valueOf();
    await prisma.task.deleteMany()
    redirect('/');
  }
  
  async function toggleTask(id: string, completed: boolean) {
    "use server"
    await prisma.task.update({ where: { id }, data: { completed }});
    redirect('/');
  }
  
  type Props = {
    completed: boolean
  }

const ToDoPage = async ({completed}: Props) => {

    const todos = await getTasks(completed)

  return (
    <div className='image-container'>
        <div className="pl-12 pt-2 mb-5">
            <div className=' text-white mt-5 ml-16'>
                <Heading size="9" as="h1">To-do:</Heading>
            </div>
            <div className="mt-5 -ml-5">
                <form action={deleteAllTasks}>
                <button className="p-1 ml-16 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
                <button className="p-1 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline">Reset Tasks</button>
                </form>
            </div> 
            <div>   
                <ul>
                    {todos.map(todo => (
                        <TaskCard key={todo.id} {...todo} toggleTask={toggleTask} />
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ToDoPage