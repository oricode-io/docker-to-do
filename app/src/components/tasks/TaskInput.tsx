import {FC} from "react";

interface TaskInputProps {
    placeholder: string;
    value: string;
    onChange: (event: any) => void;
    type?: string;
}

const TaskInput: FC<TaskInputProps> = ({placeholder, value, onChange, type = 'text'}) => {
    return (
        <input
            className="border-1 rounded-full px-4 py-2 text-black border-2 border-blue-500 m-2"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default TaskInput;
