import Logo from './Logo';
import NavLink from './NavLink';

export default function Header() {
  return (
    <div className="fixed left-0 top-0 h-12 w-full border-b border-[#1E2D3D]">
      <div className="grid h-full grid-cols-3 divide-[#1E2D3D] md:grid-cols-6 md:divide-x lg:grid-cols-12">
        <Logo />
        <NavLink url='/' text={'hello'} />
        <NavLink url='/about' text={'about-me'} />
        <NavLink url='/projects' text={'projects'} />
        <NavLink url='/blog' text={'blog'} />
        <div className='col-span-5 hidden lg:flex'></div>
        <NavLink url='/contact' text={'contact'} />
        <div className='flex items-center justify-end px-5 md:hidden'>
          <i className='i-carbon-menu' style={{fontSize: '25px'}}></i>
        </div>
      </div>
    </div>
  )
}
