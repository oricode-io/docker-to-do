import {FC} from "react";
import TaskInput from "./TaskInput";
import AddTaskButton from "./AddTaskButton";

interface TaskFormProps {
    onSubmitHandler: (event: any) => void;
    enteredTaskText: string;
    updateTaskTextHandler: (event: any) => void;
}

const TaskForm: FC<TaskFormProps> = ({onSubmitHandler, enteredTaskText, updateTaskTextHandler}) => {
    return (
        <form
            className="flex flex-row justify-center items-center my-10"
            onSubmit={(event) => onSubmitHandler(event)}
        >
            <TaskInput
                placeholder={"Feed the turtle..."}
                value={enteredTaskText}
                onChange={updateTaskTextHandler}
            />
            <AddTaskButton onClick={onSubmitHandler}/>
        </form>
    );
}

export default TaskForm;
