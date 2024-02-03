import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';

// interface Props {
//     params: {
//         id: number
//     }
// }

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
