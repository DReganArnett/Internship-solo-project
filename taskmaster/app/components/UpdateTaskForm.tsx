"use client"

import React, {useState } from 'react'

interface Props {
    task: {
        id: number
        taskName: string
        dueOn: string
        completed: boolean
    }
    submitUpdates: (() => void)
}

const UpdateTaskForm = () => {
    const [error, setError] = useState('');
    // const [taskName, setTaskName] = useState(task.taskName);
    // const [dueOn, setDueOn] = useState(task.dueOn);
    // const [completed, setCompleted] = useState(task.completed);

    return (
        <div>
            <div className='image-container'>
            <div className='p-4 ml-8'>
                    <h1 className='mb-2 text-2xl text-white'>Update Task: </h1>  
                    <form 
                        name="updateTaskForm"
                        className='space-y-3'>        
                        <input 
                            type='text' 
                            placeholder="Due On: " 
                            className="w-96 p-1 border-2 border-yellow-900 opacity-75 rounded-lg text-yellow-950 placeholder:text-yellow-950" 
                            // value={task.dueOn}
                            // onChange={(e) => setDueOn(e.target.value)}
                        />
                        <div className='p-1 bg-white opacity-75 border-2 border-yellow-950  w-96 rounded-lg'>
                            <label htmlFor='checkBox' className="text-yellow-900">Completed: </label>
                            <input 
                                className="border-yellow-900"
                                type='checkbox'
                                name='checkBox'
                                // checked={task.completed}
                                // onChange={(e) => setCompleted(!completed)}
                            />
                        </div>
                        <button 
                            // onClick={submitUpdates}
                            className="p-1 bg-white border-2 border-yellow-900 opacity-75 hover:bg-yellow-700 rounded-xl text-yellow-900"
                        >
                            Update Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateTaskForm