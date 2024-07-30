import { Task } from "../constants/type";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type CreateTaskProps = {
  task?: Task
}

const CreateTask: React.FC<CreateTaskProps> = () => {
  const isAuthenticated = false;
  const location = useLocation();
  const task = location.state?.task;

  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    title: '',
    desc: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (task) {
      setFormState({
        title: task.title,
        desc: task.desc,
        status: task.status,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form));
    const taskData: Task = {
      id: task ? task.id : Date.now(),
      title: formData.title as string,
      desc: formData.desc as string,
      status: formData.status as string,
    };
    if (isAuthenticated) {
      // will call the api
    } else {
      saveSessionStorage(taskData);
      navigate("/")
    }

    form.reset();
  };

  const saveSessionStorage = (taskData: Task) => {
    const taskDataString = sessionStorage.getItem("taskData");
    let taskInfo: Task[] = [];
    if (!taskDataString) {
      taskInfo = [{ ...taskData }];
    } else {
      taskInfo = JSON.parse(taskDataString);
      const taskIndex = taskInfo.findIndex(t => t.id === taskData.id);
      if (taskIndex >= 0) {
        taskInfo[taskIndex] = taskData;
      } else {
        taskInfo.push(taskData);
      }
    }
    sessionStorage.setItem("taskData", JSON.stringify(taskInfo));
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 h-full w-full">
      <h1>{task ? 'Edit Task' : 'Create Task'}</h1>
      <form className="flex flex-col items-center gap-4 border-2 rounded-lg p-4 w-full md:w-4/5" onSubmit={handleSubmit}>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            required
            className="rounded-md outline-none h-9 pl-2 text-black w-full sm:w-1/2"
            defaultValue={formState.title}
          />
        </section>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            required
            className="rounded-md outline-none min-h-20 pl-2 text-black"
            defaultValue={formState.desc}
          />
        </section>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            required
            className="rounded-md h-9 text-black outline-none w-full sm:w-1/2"
          >
            <option selected={formState.status === "To Do"}>To Do</option>
            <option selected={formState.status === "In Progress"}>In Progress</option>
            <option selected={formState.status === "Done"}>Done</option>
          </select>
        </section>
        <button className="bg-white text-black font-bold rounded-md px-4 py-2 w-fit">
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
