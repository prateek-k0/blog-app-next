import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Post, User } from '@/types';
import Link from 'next/link';
import ReactionButtons from './ReactionButtons';
import { BASE_URL } from "@/app/common";

async function PostExcerpt({ post, limit }: { post: Post, limit: Boolean }) {
  if(!post.reactions) post.reactions = {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0
  }
  let timeago = '';
  if(post.date) {
    const date = parseISO(post.date);
    const timeperiod = formatDistanceToNow(date);
    timeago = `${timeperiod} ago`;
  }
  const userDetails: User = await fetch(`${BASE_URL}/users/${post.userId}`).then(res => res.json());
  return (
    <div className='border rounded-lg p-4 hover:bg-slate-600 w-full'>
      <p className='text-md font-semibold font-mono text-slate-300'>{post.title}</p>
      <p className={`text-md font-sans text-slate-400 ${limit === true ? 'line-clamp-1' : ''}`}>{post.body}</p>
      <div className="flex justify-between mt-4 items-center text-sm">
        <p className="font-extralight text-slate-400">by
          &nbsp;
          <Link href={`/users/${userDetails.id}`}>
            <strong className='hover:underline underline-offset-4 font-semibold text-slate-200'>{userDetails.name}</strong>
          </Link>
        </p>
        <p className="font-extralight font-sans text-slate-400">{timeago}</p>
      </div>
      <div className='pt-4'>
      <ReactionButtons reactions={post.reactions} postId={post.id} />
      </div>
    </div>
  )
}

export default PostExcerpt