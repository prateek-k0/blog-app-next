import { Post, User } from '@/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { BASE_URL } from "@/app/common";

interface UserDetailsType {
  params: {
    userId: string
  }
}

export const revalidate = 300;  // revalidate and build every 300s, since the user data might change

// for ssg
export const generateStaticParams = async () => {
  const users: User[] = await fetch(`${BASE_URL}/users`, {
    method: 'GET'
  }).then(res => res.json());

  return users.map(user => ({
    params: {
      userId: user.id.toString()
    }
  }));
}

const UserDetails = async ({ params: { userId } } : UserDetailsType) => {
  const user: User = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'GET'
  }).then(res => res.json())

  if(!user) redirect('/users');

  const postsByUser: Post[] = await fetch(`${BASE_URL}/posts/?userId=${userId}`).then(res => res.json());

  return (
    <div className='w-full p-8'>
      <p className='font-extralight font-sans text-4xl my-6 text-slate-400'>User Details: <strong className='font-semibold font-mono text-slate-300'>{user.username}</strong></p>
      <div className='border rounded-lg p-4'>
        {Object.keys(user).filter(key => ['username', 'email', 'name'].includes(key)).map((key: string) => (
          <div key={key} className='field flex gap-2 items-center'>
            <span className='font-semibold text-orange-500 text-md font-mono'>{key}:</span>
            <span className='text-lg font-semibold font-sans'>{user[key]}</span>
          </div>
        ))}
      </div>
      <p className='font-extralight font-sans text-4xl my-6 text-slate-400'>Posts by <strong className='font-semibold font-mono text-slate-300'>{user.username}</strong></p>
      <div className='flex flex-col gap-2'>
        {postsByUser.map((post: Post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className='border rounded-lg p-4 hover:bg-slate-600'>
              <p className='text-md font-semibold font-mono text-slate-300'>{post.title}</p>
              <p className="text-md font-sans text-slate-400 line-clamp-1">{post.body}</p>
              <p className="text-sm font-extralight font-sans mt-4 text-slate-400">{post.date ?? ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserDetails