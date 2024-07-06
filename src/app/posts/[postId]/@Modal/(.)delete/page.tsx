'use client'
import { deletePost } from '@/actions'
import React, { useTransition } from 'react'

interface DeletePostType {
  params: {
    postId: string
  }
}

const DeletePost = ({ params: { postId }}: DeletePostType) => {
  const [pending, startTransition] = useTransition();
  const clickHandler = () => {
    startTransition(async () => {
      deletePost(postId);
    });
  }
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-semibold text-slate-300'>Delete post {postId}?</p>
      <button onClick={clickHandler} disabled={pending} className='w-fit disabled:bg-red-300 border px-8 py-2 bg-red-950 hover:bg-red-800 rounded-md'>
        {pending ? 'Deleting Post...' : 'Delete Post'}
      </button>
    </div>  
  )
}

export default DeletePost