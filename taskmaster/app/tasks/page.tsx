
'use client'

import React from 'react';
import { Heading } from '@radix-ui/themes';
import Link from 'next/link';
import { getAllTasks } from '../api/apiCalls';
import TaskCard from '../components/TaskCard';


const TasksPage = async () => {
  const data = await getAllTasks();

  if (!data?.tasks) {
    return <p>No tasks yet.</p>
  }

  const tasks = data.tasks;

  return (
    <div className="p-4">
      <div className="mb-6 text-yellow-900">
        <Heading size="8" as="h1">My Tasks:</Heading>
      </div>
      <button className="p-2 bg-white-500 bg-yellow-900 hover:bg-yellow-950 rounded text-white"><Link href='/tasks/new'>Add a New Task</Link></button>
      <br /><br/>
      <div>
        <ul className="pl-4">
          {tasks.map((task: { id: number, taskName: string, dueOn: string, completed: boolean}) => (
            <TaskCard  key={task.id} id={task.id} taskName={task.taskName} dueOn={task.dueOn} completed={task.completed} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TasksPage

    // <>
    //   {Array.isArray(tasks) && 
    //     tasks.map((task) => (
    //       <div
    //         key={task._id}
    //         className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
    //       >
    //         <div>
    //           <h1 className="font-bold text-2xl">{task.taskName}</h1>
    //         </div>
    //         <div className="flex gam-2">
    //           <span onClick={async() => {
    //             try {
    //               await fetch(`https://localhost:3000/api/tasks?id=${task._id}`, {
    //                 method: 'DELETE', 
    //                 headers: {'Content-Type': 'application/json'},
    //               }).then(() => {
    //                 window.location.reload();
    //               })
    //             } catch (error) {
    //               throw new Error('Unable to delete task.');
    //             }              
    //           }}>
    //             <FaRegTrashCan />
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    // </>