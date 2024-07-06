import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='w-full h-16 bg-slate-700 px-8 flex justify-between items-center font-mono'>
      <div className="brand text-2xl font-semibold">
        Blogs
      </div>
      <nav className='links'>
        <Link href="/users" className='text-slate-300 hover:text-slate-400 hover:underline underline-offset-4'>Users</Link>
      </nav>
    </div>
  )
}

export default Header