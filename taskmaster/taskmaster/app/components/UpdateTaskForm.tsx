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
            <h1 className='mb-2 text-2xl text-yellow-900'>Update Task: </h1>  
            <form 
                name="updateTaskForm"
                className='space-y-3'>        
                <input 
                    type='text' 
                    placeholder="Due On: " 
                    className="w-96 p-1 border-2 border-yellow-800 max-w-lg rounded-lg text-yellow-950 placeholder:text-yellow-900" 
                    // value={task.dueOn}
                    // onChange={(e) => setDueOn(e.target.value)}
                />
                <br />
                <label htmlFor='checkBox' className="text-yellow-900">Completed: </label>
                <input 
                    className="border-yellow-900"
                    type='checkbox'
                    name='checkBox'
                    // checked={task.completed}
                    // onChange={(e) => setCompleted(!completed)}
                />
                <br />
                <button 
                    // onClick={submitUpdates}
                    className="p-2 bg-yellow-900 hover:bg-yellow-950 rounded text-white"
                >
                    Update Task
                </button>
            </form>
        </div>
    )
}

export default UpdateTaskForm