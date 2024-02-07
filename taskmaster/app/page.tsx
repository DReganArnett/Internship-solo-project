
import { Heading } from '@radix-ui/themes'
import './globals.css';
import Link, { redirect } from 'next/navigation';
import NavBar from './NavBar';
import TaskCard from './components/TaskCard';
import prisma from '@/prisma/client';

function getTasks() {
  return prisma.task.findMany();
}

// async function CreateTodo(data: FormData) {
//   "use server"
//   const title = data.get("title")?.valueOf()
//   await prisma.task.create({ data: { taskName, dueOn, completed: false } })
//   redirect('/')
// }
// async function DeleteTask(data: FormData) {
//   "use server"
//   const taskName = data.get("taskName")?.valueOf()
//   await prisma.task.deleteMany()
//   redirect('/')
// }

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
        <button className="p-2 ml-24 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded text-yellow-950"><a href='/tasks/new'>Add a New Task</a></button>
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