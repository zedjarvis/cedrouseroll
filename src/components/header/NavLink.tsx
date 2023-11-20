import cn from 'clsx'
import { NavLink as NavigationLink } from 'react-router-dom'

interface Props {
  text: string
  url: string
}

export default function NavLink({ text, url }: Props) {
  return (
    <NavigationLink to={url} className='group relative hidden items-center justify-center px-2 md:flex'>
      {({ isActive }) => (
        <div>
          <div className={cn('text-base font-fira text-slate-500 group-hover:text-[#43D9AD]', isActive && 'text-[#43D9AD]')}>_{text}</div>
          {isActive && <span className='absolute bottom-0 left-0 inline-block h-[2px] w-full bg-[#FEA55F]'></span>}
        </div>

      )}
    </NavigationLink>
  )
}
