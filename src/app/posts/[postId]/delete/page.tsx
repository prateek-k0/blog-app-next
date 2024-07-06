import { Post } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

interface DeletePostType {
  params: {
    postId: string
  }
}
// redirect if the user directly navigates to the /posts/:postId/delete page
const DeletePost = ({ params: { postId }}: DeletePostType) => {
  redirect(`/posts/${postId}`)
  return (<></>);
}

export default DeletePost