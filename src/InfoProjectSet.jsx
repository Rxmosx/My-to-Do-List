import { useState } from 'react';
import './style/infoTaskSet.css'; 


function InfoProjectSet({ onAddProject, onEditProject, setInfoProject, projectToEdit }) {
   
  
    const [projectName, setProjectName] = useState(projectToEdit ? projectToEdit.name : '');
    const [projectDescription, setProjectDescription] = useState(projectToEdit ? projectToEdit.description : '');
    const [category, setCategory] = useState(projectToEdit ? projectToEdit.category : 'Personal');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [isClosing, setIsClosing] = useState(false);

    const triggerClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setInfoProject(false);
        }, 200);
    };

    const handleSaveProject = () => {
      
        if (!projectName.trim()) {
            setErrorMessage('Insira um título para o projeto!');
            return;
        }

        if (projectToEdit) {

            onEditProject(
                projectToEdit.id, 
                projectName, projectDescription, 
                category, 
                projectToEdit.tasks || [])
            ;
        } else {
            onAddProject(projectName, projectDescription, category, []);
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
                    
                    <h2>{projectToEdit ? 'Edit Project' : 'Create New Project'}</h2>
                    <button className="close-btn" onClick={triggerClose}>✕</button>
                </div>

                <div className="form-group">
                    <label>Project Name</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Redesign Website, College Studies..." 
                        value={projectName} 
                        onChange={(e) => {
                            setProjectName(e.target.value);
                            setErrorMessage(''); 
                        }} 
                    />
                    {errorMessage && <strong className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errorMessage}</strong>}
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


                <div className="form-group">
                    <label>Description (Optional)</label>
                    <textarea 
                        placeholder="What is this project about? Add some details..." 
                        value={projectDescription} 
                        onChange={(e) => setProjectDescription(e.target.value)} 
                        rows="3">
                    </textarea>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={triggerClose}>Cancel</button>
                    
                
                    <button className="create-btn" onClick={handleSaveProject}>
                        {projectToEdit ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default InfoProjectSet;