import { useState } from 'react';
import './style/infoTaskSet.css';

function InfoTaskSet({ onAddTask, onEditTask, setInfoTask, taskToEdit }) {
   
    const [taskName, setTaskName] = useState(taskToEdit ? taskToEdit.name : '');
    const [category, setCategory] = useState(taskToEdit ? taskToEdit.category : 'Personal');
    const [taskDueDate, setTaskDueDate] = useState(taskToEdit ? taskToEdit.date : '');
    const [taskDescription, setTaskDescription] = useState(taskToEdit ? taskToEdit.description : '');
    
    const [priority, setPriority] = useState(taskToEdit && taskToEdit.priority ? `${taskToEdit.priority} Priority` : 'Medium Priority');
    
    const [isClosing, setIsClosing] = useState(false);

    const triggerClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setInfoTask(false);
        }, 200);
    };

    const handleSaveTask = () => {
        if (!taskName.trim()) {
            alert("Please enter a Task Name.");
            return;
        }

        
        if (taskToEdit) {
            onEditTask(taskToEdit.id, taskName, taskDescription, taskDueDate, priority, category);
        } else {
            onAddTask(taskName, taskDescription, taskDueDate, priority, category);
        }
        triggerClose();
    };

    const handleCloseModal = (e) => {
        if (e.target.className.includes('info-task-set')) {
            triggerClose();
        }
    };

    return (
        <div className={`info-task-set ${isClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
            <main className="modal-glass">
                
                <div className="modal-header">
                    
                    <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
                    <button className="close-btn" onClick={triggerClose}>✕</button>
                </div>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" placeholder="What needs to be done?" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <div className="category-options">
                        {['Personal', 'Work', 'Shopping'].map(cat => (
                            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Priority</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="High Priority">High Priority</option>
                            <option value="Medium Priority">Medium Priority</option>
                            <option value="Low Priority">Low Priority</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description (Optional)</label>
                    <textarea 
                        placeholder="Add any details..." 
                        value={taskDescription} 
                        onChange={(e) => setTaskDescription(e.target.value)} 
                        rows="3">
                    </textarea>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={triggerClose}>Cancel</button>
                    
                    <button className="create-btn" onClick={handleSaveTask}>
                        {taskToEdit ? 'Save Changes' : 'Create Task'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default InfoTaskSet;