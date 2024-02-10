'use client'

import React, { useState, useEffect } from 'react'
import prisma from '@/prisma/client';
import { useRouter } from 'next/navigation';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
import Buttons from './Buttons';
import { FaRegTrashCan } from 'react-icons/fa6'
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import CheckIcon from './CheckIcon';

interface Props {
    id: string
    taskName: string
    dueOn: string
    completed: boolean
    toggleTask: (id: string, completed: boolean) => void
}


const TaskCard = async ( { id, taskName, dueOn, completed, toggleTask }: Props) => {
    console.log('id: ', id, 'taskName: ', taskName, 'dueOn: ', dueOn, 'completed: ', completed)
    const router = useRouter();
    
    return (
        <div>
            <div className="w-64 mt-5 text-yellow-900 border-yellow-900">
                <Card style={{ maxWidth: 300, borderColor:'brown' }}>
                    <Flex align="center">
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
                            <Text as="div" size="3">
                                Due on: {dueOn}
                            </Text>
                             <div>
                                <label htmlFor="checkBox">Completed: </label>
                                <input 
                                    type="checkbox"
                                    name="checkBox"
                                    id={id}
                                    checked={completed}
                                    className='mr-3  mb-2 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                    onChange={e => toggleTask(id, e.target.checked)}
                                />
                            </div>
                            <Buttons id={id} />
                        </Box>
                    </Flex>
                </Card>
            </div>
        </div>
  )
}

export default TaskCard;

