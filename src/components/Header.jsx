import { useState } from 'react'
import '../style/component/header'
import themeModeIcon from "./assets/noite-dia.png"



function Header({onAddTask, onRemoveTask, toggleTheme, handleInfoTask}) {
    const [theme, setTheme] = useState(false);


    function handleAddTask() {
        handleInfoTask();

        if (taskName && taskName.trim() !== "") {
            onAddTask(taskName);
        } else {
            alert("Task name cannot be empty.");
        }
    }

    function handleRemoveTask() {
        const taskId = parseInt(prompt("Enter the task ID to remove:"));

        if (!isNaN(taskId)) {
            onRemoveTask(taskId);
        } 
    }

    function handleToggleTheme() {

        const newTheme = theme ? 'light' : 'dark';
        setTheme(!theme);
        toggleTheme(newTheme);
    }

    return (
        <header className={`header ${toggleTheme}`}>
            <h1 style={{ color: 'var(--text-color)' }}>My To-<label style={{ color: '#dd3b29' }}>Do</label> List</h1>

            <div className="header-buttons">
                <button onClick={handleAddTask} className="header-button">Add Task</button>
                <button onClick={handleRemoveTask} className="header-button">Remove Task</button>

                <button onClick={() => handleToggleTheme()} className="header-button"><img src={themeModeIcon} alt="Dark Mode" /></button>
            </div>
        </header>
    )
}


export default Header

