import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { taskSchema } from "../../validationSchemas";


export async function GET() {
    try {
      const tasks = await prisma.task.findMany();  
      return NextResponse.json({ tasks }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}


export async function POST (request: NextRequest) {
    const body = await request.json();
    const validation = taskSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), { status: 400 });
    
    const newTask = await prisma.task.create({
        data: { taskName: body.taskName, dueOn: body.dueOn }
    });

    return NextResponse.json(newTask, { status: 201 });
}


export async function PUT (request: NextRequest, id:number) {
    try {
        const body = await request.json();
        const validation = taskSchema.safeParse(body);
        if (!validation.success) 
            return NextResponse.json(validation.error.format(), { status: 400 });
        
        const data = body.formData;
        const updatedTask = await prisma.task.update({ 
            where: {id: body.id}, 
            data: { taskName: body.taskName, dueOn: body.dueOn} 
            });
        return NextResponse.json({ message: "Task updated" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
  
export async function DELETE (request: NextRequest) {
    try {
        const body = await request.json();
        const deletedTask = await prisma.task.delete({ 
            where: {id: body.id}, 
        });
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

