import { User } from '@/types';
import React from 'react'
import Link from 'next/link';
import { BASE_URL } from "@/app/common";

async function UsersPage() {
  const users = await fetch(`${BASE_URL}/users`, {
    method: 'GET'
  }).then(res => res.json());

  return (
    <div className='user-list flex flex-col items-center w-full gap-2 p-8'>
      {users.map((user: User) => (
        <Link key={user.id} href={`/users/${user.id}`} className='w-full'>
          <div className='rounded-lg border border-slate-600 px-8 py-4 hover:bg-slate-600'>
            <p className='font-semibold font-sans text-xl mb-2'>{user.name}</p>
            <p className='text-lg font-mono text-slate-200'>{user.username}</p>
            <p className='font-extralight text-md font-sans text-slate-300'>{user.email}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UsersPage