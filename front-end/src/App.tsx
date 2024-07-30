import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar"
function App() {

  return (
    <div className='flex flex-col-reverse md:flex-row bg-black text-slate-100 h-screen'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
