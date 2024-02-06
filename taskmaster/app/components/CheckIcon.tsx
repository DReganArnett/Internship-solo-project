import React, { useState } from 'react';
import Link from 'next/link';
import { Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form';



interface Props {
    completed: boolean;
}

const CheckIcon = ({completed}: Props) => {
  const { register, handleSubmit } = useForm({defaultValues:{checkbox: []}});  
  const [complete, setComplete] = useState(false)

  
  return (
    <div id="check">
      <span></span>
      <form onSubmit={handleSubmit(() => setComplete(true))}>
     
      </form>
    </div>
                   
  )
}

export default CheckIcon