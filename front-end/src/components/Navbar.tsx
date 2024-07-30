import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { navItems } from "../constants/navItems"
import { CircleUserRound } from "lucide-react"

const Navbar = () => {
  const isAuthenticated = false
  const [activeNav, setActiveNav] = useState("")
  const { pathname } = useLocation()

  useEffect(() => {
    handleActiveNav(pathname)
  }, [pathname])

  const handleActiveNav = (value: string) => {
    setActiveNav(value)
  }
  
  const accountNav = isAuthenticated ? { to: "/account", label: "Account" } : { to: "/login", label: "Login" }

  return (
    <div className="flex md:flex-col justify-evenly md:justify-between md:h-full whitespace-nowrap border-t md:border-r md:border-t-0 p-4">
      <nav className="w-full">
        <ul className="flex md:flex-col gap-1 md:w-auto w-full justify-between md:justify-normal">
          {navItems.map(items =>
            <Link to={items.linkTo} key={items.name}>
              <li className={`cursor-pointer rounded-lg p-2 font-bold flex flex-col gap-1 lg:flex-row lg:gap-8 items-center justify-center lg:justify-start hover:bg-grey ${activeNav === `${items.linkTo}` ? "bg-grey" : "bg-transparent"}`} title={items.name} onClick={() => handleActiveNav(`${items.linkTo}`)}>
                <items.Icon size={22} />
                <span>{items.name}</span>
              </li>
            </Link>
          )}
          <Link to={accountNav.to}>
            <li className={`cursor-pointer rounded-lg p-2 font-bold flex flex-col gap-1 lg:flex-row lg:gap-4 items-center justify-center lg:justify-start md:hidden hover:bg-grey ${activeNav === accountNav.to} ? "bg-grey" : "bg-transparent"}`} title="Account" onClick={() => handleActiveNav(accountNav.to)}>
              <CircleUserRound size={22} />
              <span>{accountNav.label}</span>
            </li>
          </Link>
        </ul>
      </nav>
      <nav className="hidden md:block">
        <Link to={accountNav.to}>
          <li className={`cursor-pointer rounded-lg p-2 font-bold flex flex-col gap-1 lg:flex-row lg:gap-4 items-center justify-center lg:justify-start hover:bg-grey ${activeNav === accountNav.to ? "bg-grey" : "bg-transparent"}`} title="Account" onClick={() => handleActiveNav(accountNav.to)}>
            <CircleUserRound size={22} />
            <span>{accountNav.label}</span>
          </li>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar