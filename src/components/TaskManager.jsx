import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localstorage");
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => {
      const updateTasks = tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    });
  };
  const handleSaveTask = (newTask) => {
    setTasks((prevTasks) => {
      if (selectedTask) {
        return prevTasks.map((task) =>
          task.id === newTask.id
            ? { ...newTask, completed: task.completed }
            : task
        );
      }
      return [...prevTasks, { ...newTask, completed: false }];
    });
  };
  const toggleTaskCompletion = (taskID) => {
    setTasks((prevTasks) => {
      const updateTasks = prevTasks.map((task) =>
        task.id === taskID ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    });
  };
  return (
    <>
      <div className="p-6">
        <div className="flex gap-10 m-4 justify-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Task Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 mb-4 bg-green-500 text-white font-semibold rounded-lg cursor-pointer transition-transform transform duration-300 hover:scale-110"
          >
          Add task
        </button>
              </div>

            
        {tasks.length === 0 ?(
            <h1 className="text-white text-3xl font-semibold text-center bg-gray-500 p-6 rounded-lg">Oops there is no task added yet click on <span className="text-blue-500"> add task </span>to add some task</h1>
        ) : (

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 rounded flex flex-col justify-end sm:flex-row sm:justify-between"
            >
              <div className="flex gap-5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed ? "line-through" : ""
                    } `}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-around mt-4 sm:mt-0">
                <button
                  onClick={() => handleOpenModal(task)}
                  className="px-4 bg-blue-500 rounded text-white font-semibold cursor-pointer transition-transform transform duration-300 hover:scale-110"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-3 rounded text-white font-semibold cursor-pointer transition-transform transform duration-300 hover:scale-110"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
    )}
        <TaskModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          task={selectedTask}
        />
      </div>
    </>
  );
};
export default TaskManager;
