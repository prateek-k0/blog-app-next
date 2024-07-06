'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { createPortal } from 'react-dom'

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    createPortal(
      (<div className="absolute top-0 left-0 w-screen h-screen overflow-hidden backdrop-blur-sm flex items-center justify-center">
        <div className=' relative rounded-md border border-slate-500 w-3/4 p-8 bg-slate-800'>
          <div className="cursor-pointer hover:text-slate-300 text-4xl font-mono font-semibold close absolute top-0 right-2" onClick={() => router.back()}>&times;</div>
          {children}
        </div>
      </div>),
      document.querySelector('#modal-target') as HTMLElement
    )
  )
}

export default ModalWrapper