import {FC} from "react";

const AddTaskButton: FC<{ onClick: any }> = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className="border-1 rounded-full px-4 py-2 border-2 border-blue-500 bg-blue-500 m-2 text-white"
        >
            Add
        </button>
    );
}

export default AddTaskButton;
