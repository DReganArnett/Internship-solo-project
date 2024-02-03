import React from 'react';
import Link from 'next/link';
import { Text } from '@radix-ui/themes'



interface Props {
    completed: boolean;
}

const CheckBox = ({completed}: Props) => {
    
  return (
    <div id='checkbox'>
      
            <Text as="div" size="2">Completed:  
                <input id='cbInput' type='checkbox' />
            </Text>
    
    </div>
                   
  )
}

export default CheckBox