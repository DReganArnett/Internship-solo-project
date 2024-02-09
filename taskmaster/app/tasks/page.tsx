'use client'

import React, { useEffect } from 'react';
import prisma from '@/prisma/client';
import { useRouter, redirect } from 'next/navigation';
import LoadingSpinner from '../components/Spinner';

type Props = {
  id: string
  completed: boolean
}

function getTasks() {
  return prisma.task.findMany();
}

async function deleteAllTasks(data: FormData) {
  const id = data.get("id")?.valueOf();
  await prisma.task.deleteMany()
  redirect('/');
}

async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({ where: { id }, data: { completed }});
  redirect('/');
}

async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id }});
  redirect('/')
}


export default function TasksHome() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('tasks/all');
    router.refresh();
  }, [router]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}