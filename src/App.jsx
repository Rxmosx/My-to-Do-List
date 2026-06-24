import { useState, useEffect } from 'react';
import TaskComponent from './TaskComponent';
import ProjectComponent from './ProjectComponent';
import InfoTaskSet from './InfoTaskSet';
import InfoProjectSet from './InfoProjectSet';
import './style/App.css';
import UndefinedTaskComponent from './UndefinedTaskComponent';

function App() {
  
  const [isSettingTask, setIsSettingTask] = useState(false);
  const [isSettingProject, setIsSettingProject] = useState(false)

  const [taskToEdit, setTaskToEdit] = useState(null); 
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my-todo-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('my-todo-projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('my-todo-projects', JSON.stringify(projects));
  }, [projects]);


  const onAddProject = (projectName, projectDescription, projectCategory, projectTasks) => {
    const newProject = {
      id: Date.now(),
      name: projectName,
      description: projectDescription,
      category: projectCategory,
      tasks: [...projectTasks],
    };
    setProjects([...projects, newProject]);
  }


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

  const onEditProject = (projectId, projectName, projectDescription, projectCategory, projectTasks) => {
    setProjects(projects.map(project => project.id === projectId ? {
      ...project,
      name: projectName,
      description: projectDescription,  
      category: projectCategory,
      tasks: [...projectTasks],
    } : project));
  };
  

  const onRemoveProject = (projectId) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  };

  const handleConfirmDelete = () => {

    if (projectToDelete) {
      onRemoveProject(projectToDelete.id);
      setProjectToDelete(null); 
    }
  };


  const onRemoveTaskFromProject = (projectId, taskId) => {

    setTimeout(() => {
      setProjects(prevProjects => prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId)
          };
        }
        return project;
      }));
    }, 400);
  };

  
  const onEditTaskInProject = (projectId, updatedTaskData) => {
    
    setTaskToEdit(updatedTaskData);
    setIsSettingTask(true);
    

    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(t => t.id === updatedTaskData.id ? { ...t, ...updatedTaskData } : t)
        };
      }
      return project;
    }));
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

  const filteredProjects = projects.filter(project => {
    let matchesSidebar = true;

    if (activeFilter !== 'All Tasks' && activeFilter !== 'Today' && activeFilter !== 'Upcoming') {
      matchesSidebar = project.category === activeFilter;
    }

    const matchesSearch = 
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(search.toLowerCase()))
    ;

    return matchesSidebar && matchesSearch;
  });


  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsSettingTask(true);
  };

  
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsSettingTask(true);
  };

  const handleOpenCreateProjectModal = () => {
    setProjectToEdit(null);
    setIsSettingProject(true);
  };

  const handleOpenEditProjectModal = (project) => {
    setProjectToEdit(project);
    setIsSettingProject(true);
  };


  const onAttachTaskToProject = (projectId, taskId) => {
    let taskToMove = null;

    taskToMove = tasks.find(t => t.id === taskId);

    if (!taskToMove) {

      for (const project of projects) {

        const found = project.tasks?.find(t => t.id === taskId);

        if (found) {
          taskToMove = found;
          break; 
        }
      }
    }

    if (!taskToMove) return;

    
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        
        const alreadyHasTask = project.tasks.some(t => t.id === taskId);
        return {
          ...project,
          tasks: alreadyHasTask ? project.tasks : [...project.tasks, taskToMove]
        };
      }
      return project;
    }));

    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };


  return (
    <>
      <div className="app-container">
        <aside className="sidebar">
          
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

            <p 
            className={activeFilter === 'Shopping' ? 'active' : ''} 
            onClick={() => setActiveFilter('Shopping')}>Shopping</p>
          </nav>

          <button className="btn-project" onClick={() => setIsSettingProject(true)}>Create Project</button>
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
            {filteredTasks.length === 0  && filteredProjects.length === 0 ? (

              <div className="empty-state-container">
                <h2>No items yet. Time to create!</h2>
              </div>

            ) : (

              <>
                {filteredTasks.map(task => (
                  <TaskComponent 
                    key={task.id} 
                    task={task} 
                    onRemoveTask={onRemoveTask}
                    onEdit={handleOpenEditModal}
                  />
                ))}

                {filteredProjects.map(project => (
                  <ProjectComponent 
                    key={project.id}
                    project={project} 
                    onRemoveProject={onRemoveProject}
                    onEditProject={handleOpenEditProjectModal}
                    onRemoveTaskFromProject={onRemoveTaskFromProject}
                    onEditTaskInProject={onEditTaskInProject}
                    onAttachTask={onAttachTaskToProject}
                    onRemoveProjectClick={setProjectToDelete}
                  />
                ))}

                </>
            )}

          </div>
        </div>
      </div>

      {isSettingTask && (
          <InfoTaskSet 
            onAddTask={onAddTask} 
            onEditTask={onEditTask} 
            setInfoTask={setIsSettingTask} 
            taskToEdit={taskToEdit} 
          />
      )}
      {isSettingProject && (
        <InfoProjectSet 
          onAddProject={onAddProject}
          onEditProject={onEditProject}
          setInfoProject={setIsSettingProject}
          projectToEdit={projectToEdit}
        />
      )}
      
      {projectToDelete && (
        <div className="popup-overlay" onClick={() => setProjectToDelete(null)}>
          <div className="popup-glass" onClick={(e) => e.stopPropagation()}>
          
              <h3>Delete Project?</h3>
              <p>
                Are you sure you want to delete <strong>"{projectToDelete.name}"</strong>? 
                This will permanently erase the project and all of its sub-tasks.
              </p>
            
              <div className="popup-actions">

                <button className="popup-btn-cancel" onClick={() => setProjectToDelete(null)}>
                  Cancel
                </button>

                <button className="popup-btn-delete" onClick={handleConfirmDelete}>
                  Delete
                </button>

              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;