import {useEffect, useState} from 'react';
import axios from "axios";
import TaskItem from "./components/tasks/TaskItem";
import TaskForm from "./components/tasks/TaskForm";

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
        if (name === '') {
            return;
        }
        try {
            await axios.post("http://localhost:8080/tasks", {name: name});
            await getTasks();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTask(id: string) {
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
        <div className="flex flex-1 flex-row justify-center items-center h-dvh">
            <div className="flex flex-1 flex-col justify-center items-center bg-black h-dvh">
                <div className="flex flex-1 flex-col justify-start items-center">
                    <h1 className="text-8xl font-bold text-white mt-32">Docker</h1>
                    <p className="text-white px-20 py-6">
                        Docker To Do is a simple to do list application that uses Docker containers to run a MongoDB
                        database, a Node.js server, and a React.js front-end. This application demonstrates the use of
                        Docker,
                        Docker Compose, Named and Anonymous Volumes, and Bind Mounts.
                    </p>
                </div>
                <div className="flex flex-1 flex-row justify-center items-start">
                    <img className="rounded-lg overflow-hidden m-4" src={'./mongo_container.png'} alt={"MongoDB"}/>
                    <img className="rounded-lg overflow-hidden m-4" src={'./node_container.png'} alt={"Node"}/>
                    <img className="rounded-lg overflow-hidden m-4" src={'./react_container.png'} alt={"React"}/>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center h-dvh">
                <div className="flex flex-1 flex-col justify-start items-center">
                    <h1 className="text-8xl font-bold mt-32">To Do</h1>
                    <TaskForm
                        onSubmitHandler={onSubmitHandler}
                        enteredTaskText={enteredTaskText}
                        updateTaskTextHandler={updateTaskTextHandler}
                    />
                </div>
                <div className="flex flex-1 flex-col overflow-scroll size-full">
                    {tasks.map((task: { name: string, _id: any }) => (
                        <TaskItem
                            task={task}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default App;
