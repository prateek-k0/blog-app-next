'use client';

import React from 'react'
import { useFormStatus } from 'react-dom';

function FormButton() {
  const formStatus = useFormStatus();
  return (
    <>
      <button type="submit" 
        className='rounded-md px-8 py-2 border bg-slate-800 hover:bg-slate-600 w-fit'
        disabled={formStatus.pending}
      >
        {formStatus.pending === true ? 'Action Pending' : 'Submit'}
      </button>
    </>
  )
}

export default FormButton