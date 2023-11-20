
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 h-12 w-full border-t border-[#1E2D3D]">
      <div className="grid h-full grid-cols-3 divide-x divide-[#1E2D3D] md:grid-cols-12">
        <div className="font-fira col-span-2 inline-flex items-center pl-5 align-middle text-base text-slate-500 hover:text-[#43D9AD] md:pl-2 lg:pl-5">find me on:</div>
        <div></div>
        <div></div>
        <div className="col-span-6 hidden md:flex"></div>
        <div className="col-span-2"></div>
      </div>
    </div>
  )
}
