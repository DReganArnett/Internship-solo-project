

import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import prisma from "@/prisma/client";

const BASE_URL="http://localhost:3000/api/tasks"

interface Props {
  id:number
  completed: boolean
}


export async function toggleTask({id, completed}: Props) {
  console.log('TRYING TO TOGGLE!')
  await prisma.task.update({ where: {id}, data: {completed} });
}

export async function deleteTask({id}: Props) {
  console.log('TRYING TO DELETE!')
  await prisma.task.delete({where: {id}})
}

export async function createTask (url: string="/tasks", data: object={}) {
  const router = useRouter()
 
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data),
    });
    const tasks = response.json();
    router.push('/tasks')
    return tasks;    
  } catch (error) {
    return NextResponse.json({ message: "Unable to add task:", error }, { status: 500 });
  }
}

export async function getAllTasks () {
    try {
      const router = useRouter()
      const res = await fetch(`${BASE_URL}`,{
        cache: 'no-store',
      });

      const tasks= res.json()
  
      if (!res.ok) {
        throw new Error ("Failed to fetch tasks");
      }
      return tasks;
    } catch (error) {
      return NextResponse.json({ message: "Error loading tasks:", error }, { status: 500 });
    }
}

export async function getTaskById(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }
  
      return res.json();
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};

export async function updateTask (params:{id: number, taskName: string, dueOn: string, completed: boolean}) {
  const router = useRouter();

  //Fetch from DB
  const task = await fetch(`${BASE_URL}/${params.id}`, {
    cache: "no-store",
  }); 
   //If not found return 404, else return actual data
    if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404})
  
  try {
    const { dueOn, completed } = await task.json();
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

// export async function deleteTask (id: number) { 
//     try {
//         const router = useRouter()
//         const res = await fetch(`${BASE_URL}/${id}`, {
//         method: "DELETE",
//         headers: {'Content-Type': 'application/json'},
//         });
//         if (res.ok) {
//             router.push('/tasks');
//         }
//     } catch (error) {
//       return NextResponse.json({ message: "Error deleting task:", error }, { status: 500 });
//     }  
// };
