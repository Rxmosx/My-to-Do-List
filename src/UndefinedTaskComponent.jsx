import { useState } from 'react'
import './style/undefinedTask.css'

function UndefinedTaskComponent({ onAddTask }) {

    return (
        <div className="undefined-task">
            <p style={{ color: 'var(--text-color)' }}>No tasks included</p>

            <button className="add-button" onClick= {() => onAddTask("New Task")} style={{ color: 'var(--text-color)' }}><strong>+</strong></button>

        </div>
    )
}

export default UndefinedTaskComponent
