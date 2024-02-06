import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';

interface Props {
    params: {
        id: number
        taskName: string
        dueOn: string
        completed: boolean
    }
}

export async function GET(
    request:NextRequest,
    { params }: {params:{id: string}}) {
    //Fetch from DB
    console.log(typeof(params.id))
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id)  }
    })
    //If not found return 404
    //Else return actual data
    if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404})

    return NextResponse.json(task)
}

export async function PUT (request:NextRequest, {params:{id, taskName, dueOn, completed}}: Props) {
    //Fetch from DB
    const task = await prisma.task.findUnique({
        where: {id: Number(id)}, 
    })
    //If not found return 404, else return actual data
    if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404})

        // Get task from json
    try {
        const { taskName, dueOn, completed } = await request.json();
        const updatedTask = await prisma.task.update({
            where: {id: Number(id) },
            data: { taskName, dueOn, completed }
        });
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: 'Unable to update task.', error}, { status: 500 })
    }
}

export async function DELETE (
        request: NextRequest,
        { params }: {params:{id: string}}
    ) {
         //Fetch from DB
        const task = await prisma.task.findUnique({
            where: { id: parseInt(params.id)  }
        })
        //If not found return 404
        //Else return actual data
        if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404})
    try {
        
        await prisma.task.delete({ 
            where: {id: parseInt(params.id) }, 
        });

        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}


// export async function GET({params.id}: Props) {
//     try {
//       const tasks = await prisma.task.findUnique();  
//       return NextResponse.json({ tasks }, { status: 200 });
//     } catch (err) {
//       console.log(err);
//       return NextResponse.json({ message: "Error", err }, { status: 500 });
//     }
// }
