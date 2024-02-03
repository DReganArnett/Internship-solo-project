import React from 'react'
import Link from 'next/link';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { Card, Flex, Box, Text} from '@radix-ui/themes';
import CheckBox from './CheckBox';
import Buttons from './Buttons';

interface Props {
  id: number;
  taskName: string,
  dueOn: string,
  completed: boolean
}


const TaskCard = ({id, taskName, completed, dueOn}: Props) => {

   return (
        <>
            <div className="mb-10">
                <Card style={{ maxWidth: 300 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            {completed===true ? (
                                <Text as="div" size="6" className='line-through'>
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
                            {completed === false ? (
                                <CheckBox completed={completed} />
                            ) : (
                                null
                            )} 
                        <Buttons id={id}/>
                        </Box>
                    </Flex>
                </Card>
            </div>
        </>
  )
}

export default TaskCard;