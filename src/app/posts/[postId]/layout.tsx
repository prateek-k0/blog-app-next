'use client'

import React from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import ModalWrapper from '@/components/Modal'

const Layout = ({
  children,
  Modal
}: {
  children: React.ReactNode
  Modal: React.ReactNode
})  => {
  const activeSegment = useSelectedLayoutSegment('Modal');
  return (
    <div>
      {children}
      {(activeSegment && activeSegment !== '__DEFAULT__') && <ModalWrapper>{Modal}</ModalWrapper>}
    </div>
  )
}

export default Layout