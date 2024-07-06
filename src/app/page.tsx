import PostExcerpt from "@/components/PostExcerpt";
import { Post } from "@/types";
import { promisify } from "@/utils/promisify";
import Link from "next/link";
import { BASE_URL } from "@/app/common";
import AddNewPost from "@/components/AddNewPost";
import IconArrowRightSquare from "@/components/icons/IconArrowRightSquare";

export default async function Home() {
  const allPosts: Post[] = await fetch(`${BASE_URL}/posts`).then(res => res.json());
  
  // to show spinner after the data is loaded and during transformation, we wrap the function in a promise
  const posts = await (promisify<Post[]>(
    () => allPosts
      .slice()
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    )
  )();

  return (
    <div className="flex flex-col items-center w-full gap-2 p-8">
      <AddNewPost />
      {posts.map((post) => (
        <div key={post.id} className="w-full flex items-center gap-4">
          <PostExcerpt limit={true} post={post} />
          <Link href={`/posts/${post.id}`}>
            <IconArrowRightSquare width={32} height={32} />
          </Link>
        </div>
      ))}
    </div>
  );
}
