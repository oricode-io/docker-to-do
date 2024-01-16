import {FC} from "react";

interface TaskItemProps {
    task: { _id: any, name: string },
    deleteTask: (id: string) => void
}

const TaskItem: FC<TaskItemProps> = ({task, deleteTask}) => {

    const {_id, name} = task;

    return (
        <div className="flex flex-row justify-center align-top my-4" key={_id}>
            <div className="flex flex-1 flex-row justify-start items-center max-w-sm px-6 py-2 rounded-full bg-gray-100">
                <p className="m-0">{name}</p>
            </div>
            <button
                onClick={() => deleteTask(_id.toString())}
                className="border-1 rounded-full px-4 py-2 bg-green-500 ml-4 text-white"
            >
                Complete
            </button>
        </div>
    );
}

export default TaskItem;
