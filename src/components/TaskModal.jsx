import { useEffect } from "react";
import { useState } from "react";

const TaskModal = ({isOpen, onClose, onSave, task}) =>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() =>{
        if(task){
            setTitle(task.title);
            setDescription(task.description);
        }else{
            setTitle("");
            setDescription("");
        }
    },[task, isOpen]);

    if(!isOpen) return null;

    const handleSubmit = () =>{
        if(!title.trim()) return alert("Task title cannot be empty!!!");
        const newTask = {id: task?.id || Date.now(), title, description};
        onSave(newTask);
        onClose();
    }
    return(
        <>
        <div className="fixed bg-gray-900 inset-0 bg-opacity-50 flex justify-center items-center p-6">
            <div className="bg-gray-700 p-6 rounded-lg w-96">
                <h2 className="text-3xl text-white font-bold mb-5 text-center">{task ? "Edit Task" : "Add Task"}</h2>
                <input 
                    type="text"
                    placeholder="Task title" 
                    className="w-full p-2 bg-gray-200 text-black outline-none font-semibold rounded mb-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description" 
                    value={description}
                    className="w-full p-2 bg-gray-200 text-black outline-none rounded font-semibold"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-around mt-3">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-red-500 text-white font-semibold cursor-pointer transition-transform transform duration-300 hover:scale-110">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 rounded text-white font-semibold cursor-pointer transition-transform transform duration-300 hover:scale-110">{task ? "Update" : "Add"}</button>
                </div>
            </div>
        </div>
        </>
    )
};
export default TaskModal;