"use client"

import React, { useState } from 'react'
import '../../globals.css'
import { NextResponse } from 'next/server';
import { TextField, Button, Text, Flex, Box, Checkbox, Callout, IconButton } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTaskSchema } from '@/app/validationSchemas';
import  { number, string, z } from 'zod';
import UpdateTaskForm from '../../_components/UpdateTaskForm';
import { PiNumberThree } from 'react-icons/pi';

type TaskForm = z.infer<typeof updateTaskSchema>;

interface Props {
  id: string
  taskName: string
  dueOn: string
  completed: boolean
  toggleTask: (id:number, completed: boolean) => void
}

const UpdateTaskPage = async ({ id, taskName, dueOn, completed, toggleTask }: Props) => {
  const task = await prisma?.task.findUnique({ where: {id: parseInt(id)}})

  if (!task) {
    <p>No tasks yet.</p>
  }

  return (
    <div className='image-container'>
      <div className="pr-6 pt-2 text-right">
        <UpdateTaskForm key={id} id={id} taskName={taskName} dueOn={dueOn} completed={completed} />
      </div> 
</div>
  )
}

export default UpdateTaskPage;

