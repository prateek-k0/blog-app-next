import PostExcerpt from '@/components/PostExcerpt';
import { Post } from '@/types';
import React from 'react'
import { BASE_URL } from "@/app/common";
import Link from 'next/link';

interface PostDetailsPageType {
  params: {
    postId: string
  }
}

export default async function PostDetailsPage({ params: { postId }}: PostDetailsPageType) {
  const postDetails: Post = await fetch(`${BASE_URL}/posts/${postId}`).then(res => res.json());
  return (
    <div className="p-8 flex flex-col gap-8">
      <PostExcerpt limit={false} post={postDetails} />
      <Link href={`/posts/${postId}/delete`} className='border rounded-lg px-8 py-2 hover:bg-slate-600 w-fit'>Delete Post</Link>
    </div>
  )
}