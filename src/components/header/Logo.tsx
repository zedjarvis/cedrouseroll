import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <Link to={'/'} className="font-fira col-span-2 inline-flex items-center pl-5 align-middle text-base text-slate-500 hover:text-[#43D9AD] md:col-span-1 md:pl-2 lg:col-span-2 lg:pl-5">zed-jarvis</Link>
  )
}
