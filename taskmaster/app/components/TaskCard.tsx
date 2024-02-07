'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
import { FaCheck, FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { deleteTask } from '../api/apiCalls';
import DeleteIcon from './DeleteIcon';
import CheckIcon from './CheckIcon';
import EditIcon from './EditIcon';

interface Props {
    id: number
    taskName: string
    dueOn: string
    completed: boolean
   
}


const TaskCard = async ({id, taskName, dueOn, completed}: Props) => {
    console.log('id: ', id, 'taskName: ', taskName, 'dueOn: ', dueOn, 'completed: ', completed);

    
    return (
        <>
            <div className="mt-5 mb-7 text-yellow-900 border-yellow-900">
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
                                <button className='mr-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'>
                                    <FaCheck className='fill-current text-white'/>
                                </button>
                            )} 
                             <button className="p-3 mr-3 bg-yellow-900 hover:bg-amber-700 hover:cursor-pointer rounded-lg">
                                <Link href='/tasks/update'>
                                     <FaPencil className="fill-current text-white"/>
                                </Link>
                            </button>
                            <button 
                                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                onClick={(_id) => fetch(`http://localhost:3000/api/tasks/${id}`, {method: "DELETE",})}
                            >
                                <FaRegTrashCan className='fill-current text-white'/>
                            </button>
                          
                        </Box>
                    </Flex>
                </Card>
            </div>
        </>
  )
}

export default TaskCard;

// onClick={async () => await prisma.task.update({ where: {id}, data: {completed} })}
// onClick={async() => await prisma.task.delete({where: {id}})}

  {/* <button 
                                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                            >
                                <a href='/tasks/update'>
                                    <FaPencil className="fill-current text-white" id={id} />
                                </a>
                            </button> */}