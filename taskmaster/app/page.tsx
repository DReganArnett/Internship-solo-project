'use client'

import React, { useEffect } from 'react';
import { Heading } from '@radix-ui/themes'
import './globals.css';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
// import { UserButton } from "@clerk/nextjs";
import prisma from '@/prisma/client';


// type Props = {
//   id: string
// }

// function getTasks() {
//   return prisma.task.findMany();
// }

// async function deleteAllTasks(data: FormData) {
//   "use server"
//   const id = data.get("id")?.valueOf();
//   await prisma.task.deleteMany()
//   redirect('/');
// }

// async function toggleTask(id: number, completed: boolean) {
//   "use server"
//   await prisma.task.update({ where: { id }, data: { completed }});
//   redirect('/');
// }


const Home = async () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/tasks');
    router.refresh();
  }, [router]);


  return (
    <div>
      <div className='image-container'>
          <div className="pr-6 pt-2 text-right">
            <div className=' text-white' >
              <Heading size="9" as="h1">Taskmaster...</Heading>
            </div>
            <div className="text-white inline">
              <Heading size="5" as="h1">Manage your tasks like a boss!</Heading>
            </div>
          
          </div> 
      </div>
    </div>
  )
}

export default Home

// action={CreateTask} 
// action={DeleteTask}