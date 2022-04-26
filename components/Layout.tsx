import useUser from '@libs/client/useUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface ILayout {
  children: React.ReactNode
  title: string
  isPrivate?: boolean
}

const Layout: React.FC<ILayout> = ({ children, title, isPrivate = false }) => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (isPrivate && !isLoading && !user) {
      router.replace('/')
    }
  }, [user, router, isLoading])
  return (
    <main className="mx-auto max-w-3xl">
      <Head>
        <title>{title} | Notice</title>
      </Head>
      <div className="w-full">{children}</div>
    </main>
  )
}

export default Layout
