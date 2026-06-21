import { useState, useEffect } from 'react';
import TaskComponent from './TaskComponent';
import InfoTaskSet from './InfoTaskSet';
import './style/App.css';
import UndefinedTaskComponent from './UndefinedTaskComponent';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my-todo-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [isSetting, setIsSetting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [search, setSearch] = useState('');
  

  const [taskToEdit, setTaskToEdit] = useState(null); 

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onAddTask = (taskName, taskDescription, taskDueDate, priority, category) => {
    const newTask = {
      id: Date.now(), 
      name: taskName,
      description: taskDescription,
      date: taskDueDate || "", 
      priority: priority.replace(" Priority", ""), 
      category: category, 
      completed: false
    };
    setTasks([...tasks, newTask]);
  };


  const onEditTask = (taskId, taskName, taskDescription, taskDueDate, priority, category) => {
    setTasks(tasks.map(task => task.id === taskId ? {
      ...task,
      name: taskName,
      description: taskDescription,
      date: taskDueDate || "",
      priority: priority.replace(" Priority", ""),
      category: category
    } : task));
  };

  const onRemoveTask = (taskId) => {
    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, 400); 
  };


  const filteredTasks = tasks.filter(task => {
    let matchesSidebar = true;

    if (activeFilter === 'Today') {

      const diaHoje = new Date().getDate().toString(); 
      const diaTarefa = task.date ? task.date.split('-')[2] : null;
      matchesSidebar = diaTarefa && Number(diaTarefa) === Number(diaHoje);

    } else if (activeFilter === 'Upcoming') {

      const hoje = new Date().toISOString().split('T')[0];
      matchesSidebar = task.date > hoje;

    } else if (activeFilter !== 'All Tasks') {
      matchesSidebar = task.category === activeFilter;
    }

    const matchesSearch = 
      task.name.toLowerCase().includes(search.toLowerCase()) || 
      (task.description && task.description.toLowerCase().includes(search.toLowerCase())) ||
      (task.date && task.date.includes(search));

    return matchesSidebar && matchesSearch;
  });


  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsSetting(true);
  };

  
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsSetting(true);
  };

  return (
    <>
      <div className="app-container">
        <aside className="sidebar">
          {/* ... Seu menu lateral continua igualzinho aqui ... */}
          <h1>My To-<span>Do</span> List</h1>
          <nav className="sidebar-menu">
            <p 
            className={activeFilter === 'All Tasks' ? 'active' : ''} 
            onClick={() => setActiveFilter('All Tasks')}>All Tasks</p>

            <p 
            className={activeFilter === 'Today' ? 'active' : ''} 
            onClick={() => setActiveFilter('Today')}>Today</p>

            <p 
            className={activeFilter === 'Upcoming' ? 'active' : ''} 
            onClick={() => setActiveFilter('Upcoming')}>Upcoming</p>

            <hr className="sidebar-divider" />

            <p 
            className={activeFilter === 'Work' ? 'active' : ''} 
            onClick={() => setActiveFilter('Work')}>Work</p>

            <p 
            className={activeFilter === 'Personal' ? 'active' : ''} 
            onClick={() => setActiveFilter('Personal')}>Personal</p>
          </nav>
        </aside>

        <div className="main-content">
          <div className="top-bar">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
           
            <button className="add-btn" onClick={handleOpenCreateModal}>+ Add Task</button>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <UndefinedTaskComponent />
            ) : (
              filteredTasks.map(task => (
                <TaskComponent 
                  key={task.id} 
                  task={task} 
                  onRemoveTask={onRemoveTask}
                  onEdit={handleOpenEditModal}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isSetting && (
          <InfoTaskSet 
            onAddTask={onAddTask} 
            onEditTask={onEditTask} 
            setInfoTask={setIsSetting} 
            taskToEdit={taskToEdit} 
          />
      )}
    </>
  );
}

export default App;