'use client'

import { updateReactions } from '@/actions';
import React, { useTransition } from 'react'
import { Reactions } from '@/types';

const reactionIcons = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
};

function ReactionButtons({ reactions, postId }: { reactions: Reactions, postId: number | string }) {
  const [isPending, startTransition] = useTransition();
  const reactionClickHandler = async (event: any, key: keyof Reactions) => {
    event.preventDefault();
    event.stopPropagation();
    const newReactions = {
      ...reactions,
      [key]: reactions[key] + 1
    }
    startTransition(async () => {
      updateReactions(newReactions, postId);
    })
  }
  const reactionKeys: (keyof Reactions)[] = ['thumbsUp', 'wow', 'heart', 'rocket', 'coffee'];
  const reactionButtons = reactionKeys.map((key) => (
    <button key={key} className='px-2 py-1 border rounded-md hover:bg-slate-900' onClick={(e) => reactionClickHandler(e, key)}>
      {reactionIcons[key]} {reactions[key]}
    </button>
  ))
  return (
    <div className="flex gap-2 reaction-buttons">
      {isPending === true ? <p>Updating Reactions ...</p> : <>{reactionButtons}</>}
    </div>
  )
}

export default ReactionButtons