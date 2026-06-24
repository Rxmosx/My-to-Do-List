import { useState } from 'react';
import TaskComponent from './TaskComponent';
import './style/projectComponent.css';


function ProjectComponent({ project, onRemoveProject, onEditProject, onRemoveTaskFromProject, 
    onEditTaskInProject, onAttachTask, onRemoveProjectClick}) {
        
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);

    const handleToggleProject = (e) => {
        e.stopPropagation();
        setProjectOpen(prev => !prev);
    }

    const handleToggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen(prev => !prev);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        onEditProject(project);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        onRemoveProjectClick(project);
    };


    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
        setProjectOpen(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const fromList = e.dataTransfer.getData("sourceProjectId");
        const taskId = Number(e.dataTransfer.getData("text/plain"));

        if (taskId && fromList) {
            onAttachTask(taskId, fromList, project.id.toString());
        }
    };


  return (
    <>
        <div 
            className={`project-card-container ${isDragOver ? 'drag-hover' : ''} 
                ${projectOpen ? 'project-card-conteiner-open' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleToggleProject}
            style={{cursor: 'pointer'}}
        >
        
            <div className={`project-header-main ${projectOpen ? 'project-open' : ''}`}>

                <div className="project-info">
                
                <h3 className="project-title">{project.name}</h3>
                {project.category && (
                    <span className="project-category-tag">{project.category}</span>
                )}
                </div>

                <div className="project-meta">
                    <span className="project-count">
                        {project.tasks ? project.tasks.length : 0} {project.tasks?.length === 1 ? 'task' : 'tasks'}
                    </span>

            
                    <div className="project-options-container" style={{ position: 'relative' }}>
                        <button className="project-options-btn" onClick={handleToggleMenu}>•••</button>
                        
                        {isMenuOpen && (
                            <div className="task-dropdown" onMouseLeave={() => setIsMenuOpen(false)}>
                                <p onClick={handleEditClick}>Edit Project</p>
                                <p onClick={handleRemoveClick} className="delete-option">Delete Project</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        
        {project.description && (
            <p className="project-description">{project.description}</p>
        )}

        
            <div className="project-tasks-divider"></div>
        
            <div className={`project-tasks-list ${projectOpen ? 'project-open-tasks' : ''}`}>

                {project.tasks && project.tasks.length > 0 ? (
                    project.tasks.map(task => (
                        <TaskComponent 
                            key={task.id} 
                            task={task} 
                            onRemoveTask={(taskId) => onRemoveTaskFromProject(project.id, taskId)}
                            onEdit={(taskData) => onEditTaskInProject(project.id, taskData)}
                            project={project}
                        />
                    ))
                ) : (
                    <p className="project-empty-tasks">No tasks inside this project yet.</p>
                )}
            </div>
        </div>

        
    </>

  );
}

export default ProjectComponent;