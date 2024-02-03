import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

const BASE_URL="http://localhost:3000/api/tasks"

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
            throw new Error('Unable to post new task.');
    }
}

export async function getAllTasks () {
    const router = useRouter()

    try {
      const res = await fetch(`${BASE_URL}`);
      const tasks= res.json()
  
      if (!res.ok) {
        throw new Error ("Failed to fetch tasks");
      }
      return tasks;
    } catch (error) {
      return NextResponse.json({ message: "Error", error }, { status: 500 });
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


export async function updateTask (url: string="/tasks", data: object={}) {
    const router = useRouter()
 
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "PUT",
            cache: "no-cache",
            body: JSON.stringify(data),
        });
        const tasks = response.json();
        router.push('/tasks')
        return tasks;    
    } catch (error) {
            throw new Error('Unable to post new task.');
    }
}

export async function deleteTask (id: number) {
    const router = useRouter()
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        });
        if (res.ok) {
            router.refresh();
        }
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }  
};