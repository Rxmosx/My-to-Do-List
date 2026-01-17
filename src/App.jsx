import { useState } from 'react'
import Header from './Header'
import UndefinedTaskComponent from './UndefinedTaskComponent'
import TaskComponent from './TaskComponent'
import Footer from './Footer'
import Grades from './Grades'
import InfoTaskSet from './InfoTaskSet'
import './style/App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [infoTask, setInfoTask] = useState(false);
  const [theme, setTheme] = useState('light');

  const onAddTask = (taskName, taskDescription) => {

    setTasks([...tasks, { id: tasks.length + 1, name: taskName, completed: false, date: null, description: taskDescription }]);
  }

  const onRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  }

  const handleInfoTask = () => {
    setInfoTask(true);
  }

  const appClassName = tasks.length === 0 ? 'app-container-undefined-task' : 'app-container';

  return (

    <div className={`${appClassName} ${theme}`}>
      
      <Header onAddTask={onAddTask} onRemoveTask={onRemoveTask} toggleTheme={toggleTheme} handleInfoTask={handleInfoTask} />

      <Grades />

      {infoTask ? <InfoTaskSet onAddTask={onAddTask} infoTask={infoTask} setInfoTask={setInfoTask} /> : null}
      
      {tasks.length === 0 ? (
        <UndefinedTaskComponent onAddTask={onAddTask} toggleTheme={toggleTheme} />
      ) : (
        <main className="task-list">
          {tasks.map(task => (
            <TaskComponent task={task}  onRemoveTask={onRemoveTask} />
          ))}
        </main>
      )}



      <Footer />

    </div>
  )
}

export default App
