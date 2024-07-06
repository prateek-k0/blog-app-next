'use server';

import { revalidatePath } from "next/cache";
import { User, Post, Reactions, FormMessage } from "@/types";
import { BASE_URL } from "@/app/common";
import { redirect } from "next/navigation";

// server action to update reactions on click
export async function updateReactions(reactions:Reactions, postId: number | string) {
  await fetch(`${BASE_URL}/posts/${postId}`, { 
    method: 'PATCH',
    body: JSON.stringify({ reactions })
  }).then(res => res.json());

  revalidatePath('/');
  revalidatePath(`/posts/${postId}`);
}

// action to add new post
export async function addPost(formMessage: FormMessage, formData: FormData) {
  const title = formData.get('title') as string ?? '';
  const body = formData.get('body') as string ?? '';
  const userId = formData.get('user') as string | number;
  if(!title || !body) return {
    message: 'Invalid Form Data'
  };
  const newPost = {
    title,
    body,
    userId,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  }
  try {
    await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(newPost)
    });
  } catch (err) {
    return {
      message: (err as Error).message
    }
  }
  revalidatePath('/');
  return {
    message: ''
  }
}

// action to delete a post 
export async function deletePost(postId: string | number) {
  try {
    await fetch(`${BASE_URL}/posts/${postId}`, { 
      method: 'DELETE',
      body: JSON.stringify({ id: postId })
    }).then(res => res.json());
  } catch (err) {
    console.log(err);
  }
  revalidatePath('/');
  redirect('/');
}