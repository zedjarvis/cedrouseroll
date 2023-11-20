import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Index'
import React from 'react'

interface Props {
  children: React.ReactNode
}

function HomeLayout({ children }: Props) {


  return (
    <>
      <div className='relative h-screen w-screen border border-[#1E2D3D] bg-[#011627]'>
        <Header />
        <div className='fixed inset-y-[48px] left-0 w-full overflow-y-auto'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomeLayout
