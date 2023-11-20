
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 hidden h-12 w-full border-t border-[#1E2D3D] text-slate-500 md:block">
      <div className="grid h-full grid-cols-3 divide-x divide-[#1E2D3D] md:grid-cols-6 lg:grid-cols-12">
        <div className="font-fira col-span-2 hidden items-center pl-5 align-middle text-base hover:text-[#43D9AD] md:pl-2 lg:inline-flex lg:pl-5">find me on:</div>
        <a href="https://twitter.com/CedrouseR" target="_blank" className="flex items-center justify-center">
          <i className="i-carbon-logo-twitter" style={{ fontSize: '20px' }}></i>
        </a>
        <a href="https://www.linkedin.com/in/cedrouseroll-omondi-44b119252/" target="_blank" className="flex items-center justify-center">
          <i className="i-carbon-logo-linkedin" style={{ fontSize: '20px' }}></i>
        </a>
        <a href="https://github.com/zedjarvis" target="_blank" className="flex items-center justify-center">
          <i className="i-carbon-logo-github" style={{ fontSize: '20px' }}></i>
        </a>
        <div className="col-span-4 hidden lg:flex"></div>
        <div className="col-span-3 hidden items-center justify-end pr-5 text-xs md:flex lg:justify-center">
          <p>&gt;_ made with ❤️ by yours truly</p>
        </div>
      </div>
    </div>
  )
}
