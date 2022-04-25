import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '@components/Input'
import SubmitButton from '@components/SubmitButton'
import useMutation from '@libs/client/useMutation'
import { IResponse } from '@libs/server/types'
import { useEffect, useState } from 'react'
import FormError from '@components/FormError'
import { useRouter } from 'next/router'

interface IForm {
  email: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IForm>()
  const [formError, setFormError] = useState<string | null>(null)
  const [login, { loading, error, data }] =
    useMutation<IResponse>('/api/users/login')
  const onSubmit: SubmitHandler<IForm> = async (formData) => {
    if (loading) return
    login(formData)
  }
  useEffect(() => {
    if (error) {
      setFormError(error)
    }
    if (data?.error) {
      setFormError(data.error as string)
    }
    if (data?.ok) {
      router.push('/')
    }
  }, [error, data])
  return (
    <Layout title="로그인">
      <div className="flex flex-col items-center justify-center space-y-6 py-6">
        <h1 className="text-3xl font-medium">로그인</h1>
        <form
          className="flex w-80 flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register('email', { required: true })}
            placeholder="Email"
            type="email"
          />
          <Input
            register={register('password', { required: true })}
            placeholder="Password"
            type="password"
          />
          <SubmitButton payload="로그인" loading={loading} />
          {formError && <FormError payload={formError} />}
        </form>
        <div className="space-x-2 text-xs">
          <span>아직 가입이 안되어 있나요?</span>
          <Link href={'/create-account'}>
            <a>
              <span className="font-semibold text-lime-600 hover:underline">
                가입 하러가기
              </span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Login
