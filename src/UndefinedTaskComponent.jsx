import { useState } from 'react'
import './style/undefinedTask.css'

function UndefinedTaskComponent({ onAddTask, handleInfoTask }) {



    return (
        <div className="empty-state-container">
            <h2>No tasks yet. Time to create!</h2>
        </div>
    )
}

export default UndefinedTaskComponent
