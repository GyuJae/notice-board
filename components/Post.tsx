import { dateStr } from '@libs/client/utils'
import Link from 'next/link'
import { PostWithUser } from 'pages/api/posts'
import React from 'react'

interface IPost {
  post: PostWithUser
}

const Post: React.FC<IPost> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a>
        <div className="flex cursor-pointer flex-col space-y-1 border-b-2 p-2 text-sm">
          <span>{post.content}</span>
          <div className="flex items-center space-x-2 text-xs">
            <span className="">{post.user.name}</span>
            <div className="flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-[2px] h-3 w-3 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{post._count.postLikes}</span>
            </div>
            <span className="text-gray-500">{dateStr(post.createdAt)}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Post
