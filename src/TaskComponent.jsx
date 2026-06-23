import './style/taskComponent.css';
import './style/App.css';
import { useState } from 'react';

function TaskComponent({ task, onRemoveTask, onEdit }) {  
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const priorityClass = task.priority ? task.priority.toLowerCase() : 'medium';

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id.toString());
  };

  const handleCheck = (e) => {
    e.stopPropagation(); 
    setIsRemoving(true);
    onRemoveTask(task.id); 
  };

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false); 
    onEdit(task);         
  };

  return (
    <div 
      className={`task-item ${isRemoving ? 'checked' : ''}`}
      onMouseLeave={() => setIsMenuOpen(false)}
      draggable="true"    
      onDragStart={handleDragStart}
      style={{ cursor: 'grab' }}
    >
      <div className='task-main'>
        <div className="task-details">
          <input 
            className="task-checkbox" 
            type="checkbox" 
            checked={isRemoving || task.completed} 
            onChange={handleCheck}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="task-title">{task.name}</p>
        </div>

        <div className="task-meta">
          <span className={`priority-tag ${priorityClass}`}>
            {task.priority || 'Undefined'}
          </span>
          <span className="task-date">{task.date}</span>
          
         
          <div className="options-container" style={{ position: 'relative' }}>
            <button className="task-options" onClick={handleToggleMenu}>•••</button>
            
            {isMenuOpen && (
              <div className="task-dropdown" onClick={(e) => e.stopPropagation()}>
                <p onClick={handleEditClick}>Edit Task</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {task.description && (
        <div className="task-description">
          {task.description}
        </div>
      )}
    </div>
  );
}

export default TaskComponent;