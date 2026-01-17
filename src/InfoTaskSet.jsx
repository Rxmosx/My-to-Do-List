import './style/infoTaskSet.css';

function InfoTaskSet({ onAddTask , setInfoTask, infoTask}) {

    const handleAddTask = () => {
        const taskName = document.querySelector('.info-task-set main input[placeholder="Task Name"]').value;
        const taskDescription = document.querySelector('.info-task-set main input[placeholder="Description"]').value;

        if (!taskName && !taskDescription) {
            return null;
        } else {

            onAddTask(taskName, taskDescription);
            setInfoTask(false)
        }

    }



    return (

        <div className="info-task-set">

            <main>

                <input placeholder="Task Name"></input>

                <input placeholder="Description"></input>

                <button onClick={handleAddTask}>Add Task</button>
            </main>
        </div>
    );

}




export default InfoTaskSet;