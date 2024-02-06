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

const UpdateTaskForm = ({ task, submitUpdates}: Props) => {
    const [error, setError] = useState('');
    const [taskName, setTaskName] = useState(task.taskName);
    const [dueOn, setDueOn] = useState(task.dueOn);
    const [completed, setCompleted] = useState(task.completed);

    return (
        <div>
            <h1 className='mb-2 text-2xl text-black'>Update {taskName}: </h1>  
            <form 
                name="updateTaskForm"
                className='space-y-3'>        
                <input 
                    type='text' 
                    placeholder="Due On: " 
                    className="w-96 p-1 border-2 border-gray-300 max-w-lg rounded-lg text-gray-500 placeholder:text-gray-500" 
                    value={task.dueOn}
                    onChange={(e) => setDueOn(e.target.value)}
                />
                <br />
                <label htmlFor='checkBox'>Completed: </label>
                <input 
                    type='checkbox'
                    name='checkBox'
                    checked={task.completed}
                    onChange={(e) => setCompleted(!completed)}
                />
                <button 
                    onClick={submitUpdates}
                    className="p-2 bg-gray-500 hover:bg-gray-700 rounded text-white"
                >
                    Update Task
                </button>
            </form>
        </div>
    )
}

export default UpdateTaskForm