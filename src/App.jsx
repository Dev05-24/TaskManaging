import TaskManager from "./components/TaskManager";

const App = () =>{
  return(
    <>
      <div className="p-6 bg-gray-600 min-h-screen">
        <h1 className="text-white text-4xl font-bold text-center ">Welcome to task manager</h1>
        <TaskManager />
      </div>
    </>
  )
}
export default App;