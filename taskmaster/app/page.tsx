
import { Heading } from '@radix-ui/themes'
import './globals.css';
import { redirect } from 'next/navigation';
import TaskCard from './components/TaskCard';
import prisma from '@/prisma/client';

type Props = {
  id: string
}

function getTasks() {
  return prisma.task.findMany();
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

// async function deleteSingleTask(id: string) {
//   "use server"
//   await prisma.task.delete({where: { id } });
//   redirect('/');
// }

const Home = async () => {
  const tasks = await getTasks();

  return (
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
  )
}

export default Home

// action={CreateTask} 
// action={DeleteTask}