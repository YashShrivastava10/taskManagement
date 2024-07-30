import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import TaskPage from "../components/TaskPage"
import History from "../components/History"
import CreateTask from "../components/CreateTask";
import Account from "../components/Account";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TaskPage />
      },
      {
        path: "/create-task",
        element: <CreateTask />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
])

export default router