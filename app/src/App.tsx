import {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

    const [tasks, setTasks] = useState([]);
    const [enteredTaskText, setEnteredTaskText] = useState('');

    const updateTaskTextHandler = (event: any) => {
        setEnteredTaskText(event.target.value);
    }

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        setEnteredTaskText('')
        try {
            await createTask(enteredTaskText);
            await getTasks();
        } catch (error) {
            console.error(error);
        }
    }

    async function getTasks() {
        try {
            const response = await axios.get("http://localhost:8080/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createTask(name: string) {
        try {
            await axios.post("http://localhost:8080/tasks", {name: name});
            await getTasks();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTask(id: number) {
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`);
            await getTasks();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            await getTasks();
        })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Tasks</h1>
                <form onSubmit={(event) => onSubmitHandler(event)}>
                    <input
                        type="text"
                        value={enteredTaskText}
                        onChange={updateTaskTextHandler}
                    />
                    <button type="submit">Create Task</button>
                </form>
                <ul>
                    {tasks.map((task: any) => (
                        <li key={task._id}>
                            {task.name}
                            <button onClick={() => deleteTask(task._id.toString())}>Delete</button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );

}

export default App;
