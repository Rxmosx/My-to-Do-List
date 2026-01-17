import {useState} from 'react'
import Header from './Header.jsx'
import './style/taskComponent.css'

function Task({task, onRemoveTask}) {  

    const [isHovered, setIsHovered] = useState(false);


    return (
        <div className="task-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{width: 'var(--width-item)'}}>

            <div className="task-details">
                <input className="task-checkbox" type="checkbox" checked={task.completed} onChange={() => onToggleTaskCompletion(task.id)} />
                
                <div className="task-text">
                    <p><strong>{task.name}</strong> </p>
                    <p><strong>{task.description}</strong> </p>
                </div>
                    
        </div>

        <div></div>
            {isHovered && <p className="hover-msg" onClick={() => onRemoveTask(task.id)}>x</p>}
        </div>
    )
}

export default Task
