import React, { useState } from 'react';
import { toggleTask } from '../api/apiCalls';
import { FaCheck } from 'react-icons/fa6';

interface Props {
    id: number
    completed: boolean;
}

const CheckIcon = ({id, completed}: Props) => {
  return (
    <div id="check">
      <form action={toggleTask}>
        <button className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'>
          <FaCheck 
            className='fill-current text-white'
            id={id}
            completed={completed}
          />
        </button>
      </form>
    </div>
                   
  )
}

export default CheckIcon