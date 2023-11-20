import HomeLayout from "@/layouts/HomeLayout"
import { useHead } from "unhead"

export default function Index() {
  useHead({
    title: 'Home'
  })
  return (
    <HomeLayout>
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex h-full w-full flex-col justify-between pl-5 pt-16 md:pl-32 lg:justify-normal lg:pt-36">
          <div>
            <h1 className="text-base text-slate-200">Hey there, I am</h1>
            <h2 className="text-[40px] font-normal text-slate-200">Cedrouseroll Omondi</h2>
            <h3 className="text-[20px] text-[#4D5BCE]">&gt; Full-Stack developer</h3>
          </div>

          <div className="mb-10 mt-0 md:mb-5 md:mt-20">
            <p className="text-sm text-slate-500">// work in progress...</p>
            <p className="hidden text-sm text-slate-500 md:block">// ui adapted from figma template, built with react and tailwind</p>
            <p className="hidden text-sm text-slate-500 md:block">// you can also see it on my Github page</p>
            <p className="block text-sm text-slate-500 md:hidden">// find my profile on Github:</p>
            <p className="mt-5 text-sm md:mb-0"><span className="text-[#4D5BCE]">const</span> <span className="text-[#43D9AD]">githubLink</span> = <a href="https://github.com/zedjarvis/portfolio-react" target="_blank" className="text-[#E99287]">"https://github.com/zedjarvis/portfolio-react"</a>;</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
