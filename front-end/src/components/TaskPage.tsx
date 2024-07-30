import { ClipboardPen, ClipboardX } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Task } from "../constants/type";

const TaskPage = () => {

  const navigate = useNavigate()

  const [data, setData] = useState<Task[] | null | undefined>(() => {
    const savedData = sessionStorage.getItem("taskData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleEditTask = (task: Task) => {
    navigate('/create-task', { state: { task } });
  }
  
  const handleDeleteTask = (id: number) => {
    const updatedData = data?.filter(item => item.id !== id);
    setData(updatedData)
    sessionStorage.setItem("taskData", JSON.stringify(updatedData))
  }

  return (
    <div className="flex flex-col items-center gap-10 p-6 h-full w-full">
      <h1>Tasks</h1>
      {!data ?
        <div>
          <h3>Loading...</h3>
        </div> :
        !data.length ?
          <div className="flex flex-col items-center gap-4 whitespace-nowrap">
            <h2>No Tasks</h2>
            <Link to="/create-task">
              <button className="bg-white text-black font-bold rounded-md px-4 py-2 w-min">Create Task</button>
            </Link>
          </div> :
          <main className="flex flex-col gap-2 w-full">
            {data.map((item: Task) =>
              <div key={item.id} className="border rounded-md flex p-4">
                <div className="w-3/4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h2>{item.title}</h2>
                    <h6 className={`bg-grey p-2 rounded-md ${item.status === "In Progress" && 'text-orange-400'} ${item.status === "To Do" && 'text-red-400'} ${item.status === "Done" && 'text-green-400'}`}>{item.status}</h6>
                  </div>
                  <span>{item.desc}</span>
                </div>
                <div className="w-1/4 flex items-center justify-center gap-8">
                  <ClipboardPen size={22} className="cursor-pointer" onClick={() => handleEditTask(item)}/>
                  <ClipboardX size={22} className="cursor-pointer" onClick={() => handleDeleteTask(item.id)} />
                </div>
              </div>
            )}
          </main>}
    </div>
  )
}

export default TaskPage