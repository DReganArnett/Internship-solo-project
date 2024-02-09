'use client'

import React, { useState, useEffect } from 'react'
import prisma from '@/prisma/client';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
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
    deleteTask: (id: string) => void
}


const TaskCard = async ( { id, taskName, dueOn, completed, toggleTask, deleteTask }: Props) => {

    return (
        <div>
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
                            {/* <span className="mr-3 mt-3 inline">
                                <CheckIcon id={id} completed={completed} toggleTask={toggleTask} />
                            </span> */}
                             <div>
                                <label htmlFor="checkBox">Completed: </label>
                                <input 
                                    type="checkbox"
                                    name="checkBox"
                                    id={id}
                                    className='mr-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                    onChange={e => toggleTask(id, e.target.checked)}
                                />
                            </div>
                            <span className="mr-3 mt-3 inline">    
                                <EditIcon id={id} />
                                <DeleteIcon id={id} deleteTask={deleteTask} />
                            </span>
                            {/* <span className="mr-3 mt-3 inline">
                                <DeleteIcon id={id} />
                            </span> */}
                        </Box>
                    </Flex>
                </Card>
            </div>
        </div>
  )
}

export default TaskCard;

{/* <div>
    <label htmlFor="checkBox">Completed: </label>
    <input 
        type="checkbox"
        name="checkBox"
        id={id}
        className='mr-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
        onChange={e => toggleTask(id, e.target.checked)}
    />
</div> */}



{/* <button 
    id={id}
    className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
    onClick={() => deleteSingleTask}
>
    <FaRegTrashCan className='fill-current text-white'/>
</button> */}