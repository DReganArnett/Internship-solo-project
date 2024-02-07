
import { Heading, AlertDialogRoot, AlertDialogContent, AlertDialogTitle } from '@radix-ui/themes'
import './globals.css';
import { redirect } from 'next/navigation';
import NavBar from './NavBar';
import TaskCard from './components/TaskCard';
import prisma from '@/prisma/client';

function getTasks() {
  return prisma.task.findMany();
}

async function DeleteAllTasks(data: FormData) {
  "use server"
  const id = data.get("id")?.valueOf()
  await prisma.task.deleteMany()
  redirect('/')
}

const Home = async () => {

  const tasks = await getTasks();

  return (
    <div className='image-container'>
      <div>
        <div className="pr-6 pt-2 text-right">
          <div className=' text-white' >
            <Heading size="9" as="h1">Taskmaster...</Heading>
          </div>
          <div className="text-white inline">
            <Heading size="5" as="h1">Manage your tasks like a boss!</Heading>
          </div>
        </div> 
        <form action={DeleteAllTasks}>
          <button className="p-1 ml-16 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
          <button className="p-1 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline">Reset Tasks</button>
        </form>
      </div>
      <div className="pl-4 ml-12 flex">
        <ul>
          {tasks.map(task => (
            <TaskCard key={task.id} {...task} />
          ))}
        </ul>
      </div>
    </div>

  )
}

export default Home

// action={CreateTask} 
// action={DeleteTask}