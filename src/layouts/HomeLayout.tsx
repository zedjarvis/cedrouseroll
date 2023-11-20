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
        <div className='fixed bottom-0 left-0 top-[48px] w-full overflow-auto md:bottom-[48px]'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomeLayout
