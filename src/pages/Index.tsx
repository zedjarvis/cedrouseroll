import HomeLayout from "@/layouts/HomeLayout"

export default function Index() {
  return (
    <HomeLayout>
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex h-full w-full flex-col pl-5 pt-16 md:pl-32 lg:pt-32">
          <h1 className="text-base text-slate-200">Hi all, I am</h1>
          <h2 className="text-[40px] font-normal text-slate-200">Cedrouseroll Omondi</h2>
          <h3 className="text-[20px] text-[#4D5BCE]">&gt; Full-Stack developer</h3>

          <p className="mt-20 text-sm text-slate-500">// ui adapted from figma, built with react and tailwind</p>
          <p className="text-sm text-slate-500">// you can also see it on my Github page</p>
          <p className="mt-5 text-sm"><span className="text-[#4D5BCE]">const</span> <span className="text-[#43D9AD]">githubLink</span> = <span className="text-[#E99287]">"https://github.com/zedjarvis/portfolio-react"</span>;</p>
        </div>
      </div>
    </HomeLayout>
  )
}
