
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
import { FaCheck, FaPencil, FaRegTrashCan } from 'react-icons/fa6';


interface Props {
  id: number
  taskName: string
  dueOn: string
  completed: boolean
}


const TaskCard = ({id, taskName, completed, dueOn}: Props) => {
    const router = useRouter();
    
    return (
        <>
            <div className="mb-10">
                <Card style={{ maxWidth: 300 }}>
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
                                    className='mr-3 mt-3 p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg'
                                    type="submit"
                                    onSubmit={(async (id, data = {completed}) => {
                                        try {
                                            await fetch(`http://localhost:3000/api/update/${id}`, {
                                                method: "PUT",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify(data)
                                            }).then(response => response.json())
                                              .then(() => {
                                                router.push('/tasks')
                                            })
                                        } catch (error) {
                                            throw new Error('Unable to mark task as completed.');
                                        }
                                    })}
                                >  
                                    <FaCheck 
                                        className='fill-current text-white'>
                                    </FaCheck>
                                </button>
                            )}
                            <button 
                                className='mr-3 mt-3 p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg'>
                                    <Link href='/tasks/update'>
                                        <FaPencil className="fill-current text-white"/>
                                    </Link>
                            </button>
                            <button 
                                className='mr-3 mt-3 p-3 bg-gray-500 hover:bg-gray-700 hover:cursor-pointer rounded-lg'
                                type='submit'
                                onSubmit={async (id) => {
                                    try {
                                        await fetch(`http://localhost:3000/api/tasks/${id}`,{
                                            method:"DELETE",
                                                headers:{"Content-Type":"application/json"},
                                            }).then(()=>{
                                                router.push('/tasks');
                                            })
                                        
                                    } catch (error) {
                                        throw new Error('Unable to delete task.');
                                    }
                                }}>
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