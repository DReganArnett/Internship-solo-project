import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
import { FaCheck, FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { toggleTask, deleteTask } from '../api/apiCalls';
import prisma from '@/prisma/client';


interface Props {
    id: number
    taskName: string
    dueOn: string
    completed: boolean
    deleteTask?(value:number):void
    toggleTask?(value:number):void
}

const TaskCard = async ({id, taskName, dueOn, completed}: Props) => {
    console.log('id: ', id, 'taskName: ', taskName, 'dueOn: ', dueOn, 'completed: ', completed);


    return (
        <>
            <div className="mb-7 text-yellow-900 border-yellow-900">
                <Card style={{ maxWidth: 300, borderColor:'brown' }}>
                    <Flex gap="3" align="center">
                        <Box>
                            {completed===true ? (
                                  <Text as="div" size="6" className='line-through inline'>
                                   {taskName} 
                                </Text>
                            ) : (
                                <Text as="div" size="6">
                                    {taskName} 
                                </Text>
                            )}
                            <Text as="div" size="2">
                                Due on: {dueOn}
                            </Text>
                            {completed===true ? (
                                null
                            ) : (
                                <button 
                                    className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                    onClick={async () => await prisma.task.update({ where: {id}, data: {completed} })}>
                                    <FaCheck className='fill-current text-white'></FaCheck>
                                </button>
                            )}
                            {/* <button 
                                className='mr-3 mt-3 p-3 bg-amber-500 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white'
                            >
                                <Link href='/tasks/update'>Edit
                                    {/* <FaPencil className="fill-current text-white"/> */}
                                {/* </Link>
                            </button> */}
                            <button 
                                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                onClick={async() => await prisma.task.delete({where: {id}})}>
                                    <FaRegTrashCan className="fill-current text-white"/> 
                            </button>
                        </Box>
                    </Flex>
                </Card>
            </div>
        </>
  )
}

export default TaskCard;