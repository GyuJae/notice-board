import useMutation from '@libs/client/useMutation'
import useUser from '@libs/client/useUser'
import { cls } from '@libs/client/utils'
import { IResponse } from '@libs/server/types'
import { useRouter } from 'next/router'
import { CommentWithUser } from 'pages/api/posts/[id]'
import { useEffect } from 'react'
import { useSWRConfig } from 'swr'

interface IComment {
  comment: CommentWithUser
}

const Comment: React.FC<IComment> = ({ comment }) => {
  const { user } = useUser()
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const {
    query: { id },
  } = router
  const [toggleCommentLike, { loading, data }] = useMutation<IResponse>(
    `/api/posts/${id}/toggle-comment-like`
  )
  const onToggleCommentLike = () => {
    if (loading) return
    toggleCommentLike({ commentId: comment.id })
  }
  useEffect(() => {
    if (data && data.ok) {
      mutate(`/api/posts/${id}`)
    }
  }, [data, mutate])
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex flex-col space-y-1">
        <div className="text-sm">{comment.user.name}</div>
        <div className="text-xs">{comment.content}</div>
      </div>
      <div
        className={cls(
          'flex items-center justify-center space-x-1',
          user && comment.commentLikes.map((i) => i.userId).includes(user.id)
            ? 'text-red-600'
            : 'text-gray-600'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-[1px] h-3 w-3 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={onToggleCommentLike}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-xs">{comment._count.commentLikes}</span>
      </div>
    </div>
  )
}

export default Comment
