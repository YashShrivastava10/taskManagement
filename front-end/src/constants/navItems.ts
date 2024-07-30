import { ClipboardList, ClipboardPlus, History, LucideProps } from "lucide-react"

type NavItem = {
  name: string,
  linkTo: string,
  Icon: React.ComponentType<LucideProps>
}

export const navItems: NavItem[] = [
  { name: "Tasks", linkTo: "/", Icon: ClipboardList },
  { name: "Create Task", linkTo: "/create-task", Icon: ClipboardPlus },
  { name: "History", linkTo: "/history", Icon: History },
]