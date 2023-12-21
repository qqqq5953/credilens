import Menu from "./Menu"
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <nav className="flex justify-between items-center px-4 py-3 shadow">
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r to-indigo-600 from-sky-500">
        <Link to="/">CrediLens</Link>
      </h1>
      <div className="flex items-center gap-2">
        <Menu />
      </div>
    </nav>
  )
}
