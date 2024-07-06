'use client'

import { addPost } from '@/actions'
import { User } from '@/types'
import React, {useRef} from 'react'
import { useFormState } from 'react-dom'
import FormButton from './FormButton'

const AddPostForm = ({ users }: {users: User[]}) => {
  const [formState, formDispatch] = useFormState(addPost, { message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="border rounded-lg mb-6 p-4 w-full flex flex-col gap-4">
      <p className="text-2xl font-semibold font-sans">
        Add New Post
      </p>
      <form ref={formRef} action={async (formData) => {
        await formDispatch(formData);
        (formRef.current !== null) && formRef.current.reset();  // to reset the form after submission
      }} className='flex flex-col gap-4'>
      {formState.message !== '' && <p className='text-red-500 font-semibold text-md font-mono'>{formState.message}</p>}
          <div className="w-full field flex flex-col gap-1">
            <label htmlFor="title" className='text-slate-400 text-sm font-sans'>Title</label>
            <input type="text" name="title" id="title" className='h-8 rounded-md border outline-none text-slate-800 text-md px-4 py-2' />
          </div>
          <div className="w-full field flex flex-col gap-1">
            <label htmlFor="body" className='text-slate-400 text-sm font-sans'>Body</label>
            <textarea name="body" id="body" className='h-40 resize-none rounded-md border outline-none text-slate-800 bg-white text-md px-4 py-2' />
          </div>
          <div className="w-full field flex flex-col gap-1">
            <label htmlFor="user" className='text-slate-400 text-sm font-sans'>User</label>
            <select name="user" id="user" className='text-slate-800 outline-none h-8 px-4 rounded-md'>
              {users.map(user => (<option key={user.id} value={user.id}>{user.username} - {user.name}</option>))}
            </select>
          </div>
          <FormButton />
        </form>
    </div>
  )
}

export default AddPostForm