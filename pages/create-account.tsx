import type { NextPage } from 'next'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '@components/Input'
import Layout from '@components/Layout'
import SubmitButton from '@components/SubmitButton'
import useMutation from '@libs/client/useMutation'
import { IResponse } from '@libs/server/types'
import { useState } from 'react'
import FormError from '@components/FormError'

interface IForm {
  email: string
  password: string
  name: string
}

const CreateAccount: NextPage = () => {
  const { register, handleSubmit } = useForm<IForm>()
  const [formError, setFormError] = useState<string | null>(null)
  const [createAccount, { loading, error, data }] = useMutation<IResponse>(
    '/api/users/create-account'
  )

  const onSubmit: SubmitHandler<IForm> = (dataForm) => {
    createAccount(dataForm)
    if (error) {
      setFormError(error)
    }
    if (data?.error) {
      setFormError(data?.error as string)
    }
  }

  return (
    <Layout title="가입하기">
      <div className="flex flex-col items-center justify-center space-y-6 py-6">
        <h1 className="text-3xl font-medium">가입하기</h1>
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
            register={register('name', { required: true })}
            placeholder="Name"
            type="text"
          />
          <Input
            register={register('password', { required: true })}
            placeholder="Password"
            type="password"
          />
          <SubmitButton payload="가입하기" loading={loading} />
          {formError && <FormError payload={formError} />}
        </form>
        <div className="space-x-2 text-xs">
          <span>이미 가입되어 있나요?</span>
          <Link href={'/login'}>
            <a>
              <span className="font-semibold text-lime-600 hover:underline">
                로그인 하러가기
              </span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default CreateAccount
