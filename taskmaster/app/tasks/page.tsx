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
      <div className="mb-6">
        <Heading size="8" as="h1">My Tasks:</Heading>
      </div>
      <button className="p-2 bg-white-500 bg-gray-500 hover:bg-gray-700 rounded text-white"><Link href='/tasks/new'>Add a New Task</Link></button>
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