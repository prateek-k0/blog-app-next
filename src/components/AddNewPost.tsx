import React from 'react'
import { BASE_URL } from '@/app/common'
import { User } from '@/types'
import AddPostForm from './AddPostForm';

async function AddNewPost() {
  const users: User[] = await fetch(`${BASE_URL}/users`).then(res => res.json());

  return (
    <AddPostForm users={users} />
  )
}

export default AddNewPost