import type { NextPage } from 'next'
import Layout from '@components/Layout'
import useSWR, { useSWRConfig } from 'swr'
import { IFindPost } from 'pages/api/posts/[id]/index'
import { useRouter } from 'next/router'
import LoadingSpiner from '@components/LoadingSpiner'
import { SubmitHandler, useForm } from 'react-hook-form'
import Textarea from '@components/Textarea'
import SubmitButton from '@components/SubmitButton'
import useMutation from '@libs/client/useMutation'
import { useEffect } from 'react'
import { IResponse } from '@libs/server/types'
import Comment from '@components/Comment'
import { cls, dateStr } from '@libs/client/utils'

interface ICommentForm {
  content: string
}

const Detail: NextPage = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  // Read Post
  const { mutate } = useSWRConfig()
  const {
    data,
    error,
    // mutate: postMutate,
  } = useSWR<IFindPost>(`/api/posts/${id}`)

  // Create Comment
  const { register, handleSubmit, setValue } = useForm<ICommentForm>()
  const [
    createComment,
    { loading: createCommentLoading, data: createCommentData },
  ] = useMutation<IResponse>(`/api/posts/${id}/create-comment`)

  const onSubmit: SubmitHandler<ICommentForm> = ({ content }) => {
    if (createCommentLoading) return
    createComment({ content })
    setValue('content', '')
  }

  // Toggle Like
  const [toggleLike, { loading: toggleLikeLoading, data: toggleLikeData }] =
    useMutation(`/api/posts/${id}/toggle-post-like`)

  const onToggleLike = () => {
    if (toggleLikeLoading) return
    toggleLike(null)
    // postMutate((prev) => {
    //   if (prev && prev.post) {
    //     return {
    //       ...prev,
    //       isLike: !prev.isLike,
    //       post: {
    //         ...prev.post,
    //         _count: {
    //           comments: prev.post._count.comments,
    //           postLikes: prev.isLike
    //             ? prev.post._count.postLikes - 1
    //             : prev.post._count.postLikes + 1,
    //         },
    //       },
    //     }
    //   }
    // })
  }

  useEffect(() => {
    if (
      (createCommentData && createCommentData.ok) ||
      (toggleLikeData && toggleLikeData.ok)
    ) {
      mutate(`/api/posts/${id}`)
    }
  }, [createCommentData, mutate, toggleLikeData])

  if (!data || error) {
    return (
      <Layout title="Detail">
        <div className="flex items-center justify-center py-20">
          <LoadingSpiner />
        </div>
      </Layout>
    )
  }
  return (
    <Layout title="Detail">
      <div>
        <div className="space-y-2 border-b-[1.5px] py-4">
          <div className="px-2 py-1 font-semibold">{data.post?.user.name}</div>
          <div className="px-2 text-sm">{data.post?.content}</div>
          {data.post?.createdAt && (
            <div className="px-2 text-xs text-gray-500">
              {dateStr(data.post.createdAt)}
            </div>
          )}
        </div>
        <div className="flex items-center justify-around border-b-[1.5px] py-2">
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs font-semibold">
              {data.post?._count.comments}
            </span>
          </div>
          <div
            className={cls(
              'flex items-center justify-center space-x-1',
              data.isLike ? 'text-red-600' : 'text-gray-600'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={onToggleLike}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs font-semibold">
              {data.post?._count.postLikes}
            </span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex w-full flex-col space-y-1"
        >
          <Textarea
            register={register('content', { required: true })}
            placeholder={'댓글 달기'}
          />
          <SubmitButton payload="댓글달기" loading={createCommentLoading} />
        </form>
        <div className="space-y-2 py-2">
          {data.post?.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Detail
