import { CircleUserRound } from "lucide-react"
import { useRef, useState } from "react";

const Login = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleClick = () => {
    if(fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return

    const file = event.target.files[0];

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (file && validImageTypes.includes(file.type)) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 h-full w-full">
      <h1>Login</h1>
      <form className="flex flex-col items-center gap-4 border-2 rounded-lg p-4 w-4/5 md:w-1/2" onSubmit={handleSubmit}>
        <section>
         {previewUrl ? 
          <div onClick={handleClick} className="flex items-center justify-center h-[100px] w-[100px] overflow-hidden rounded-full cursor-pointer">
            <img src={previewUrl} alt="Preview"/>
          </div> 
          :
          <CircleUserRound size={100} className="cursor-pointer" onClick={handleClick}/>}
         <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </section>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-md outline-none h-9 pl-2 text-black w-full"
          />
        </section>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md outline-none h-9 pl-2 text-black w-full"
          />
        </section>
        <section className="flex flex-col w-full gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-md outline-none h-9 pl-2 text-black w-full"
          />
        </section>
        <button className="bg-white text-black font-bold rounded-md px-4 py-2 w-fit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login