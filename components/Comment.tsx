import { CommentWithUser } from 'pages/api/posts/[id]'

interface IComment {
  comment: CommentWithUser
}

const Comment: React.FC<IComment> = ({ comment }) => {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex flex-col space-y-1">
        <div className="text-sm">{comment.user.name}</div>
        <div className="text-xs">{comment.content}</div>
      </div>
      <div className="flex items-center justify-center space-x-1 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-[1px] h-3 w-3 cursor-pointer"
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
        <span className="text-xs">{comment._count.commentLikes}</span>
      </div>
    </div>
  )
}

export default Comment
