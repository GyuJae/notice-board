import type { NextPage } from 'next'
import Layout from '@components/Layout'
import useMutation from '@libs/client/useMutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '@components/SubmitButton'
import { useEffect } from 'react'
import { ICreatePostResponse } from 'pages/api/posts/create-post'
import { useRouter } from 'next/router'
import Textarea from '@components/Textarea'

interface IForm {
  content: string
}

const CreatePost: NextPage = () => {
  const [createPost, { loading, data }] = useMutation<ICreatePostResponse>(
    '/api/posts/create-post'
  )
  const router = useRouter()
  const { register, handleSubmit } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = ({ content }) => {
    createPost({
      content,
    })
  }

  useEffect(() => {
    if (data?.ok && data.postId) {
      router.replace(`/posts/${data.postId}`)
    }
  }, [data, router, data?.postId])
  return (
    <Layout title="글 쓰기" isPrivate>
      <div className="flex flex-col justify-center space-y-4 py-4">
        <h1 className="ml-2 text-lg">글 쓰기</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-2"
        >
          <Textarea
            register={register('content', { required: true })}
            placeholder={'댓글 달기'}
          />
          <SubmitButton payload="글쓰기" loading={loading} />
        </form>
      </div>
    </Layout>
  )
}

export default CreatePost
