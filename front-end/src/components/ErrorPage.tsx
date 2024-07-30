import { Link, useRouteError } from "react-router-dom"

type RouteError = {
  status?: number;
  statusText?: string;
};

const ErrorPage = () => {
  const { status, statusText } = useRouteError() as RouteError
  return (
    <div className="h-screen w-screen bg-black text-slate-100 flex flex-col items-center pt-10 gap-6 whitespace-nowrap">
      <h1>Oops!</h1>
      <h2>{status}: {statusText}</h2>
      <Link to="/">
        <button className="bg-white text-black font-bold rounded-md px-4 py-2 w-min">Go To Tasks</button>
      </Link>
    </div>
  )
}

export default ErrorPage