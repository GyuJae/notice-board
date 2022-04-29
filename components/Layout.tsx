import useUser from '@libs/client/useUser'
import Head from 'next/head'
import Link from 'next/link'
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
    <div className="relative mx-auto max-w-3xl">
      <Head>
        <title>{title} | Notice</title>
      </Head>
      <header className="flex items-center justify-between border-b-[1px] bg-white py-4 px-2">
        <div className="text-xl">
          <Link href="/">
            <a>
              <span>Notice</span>
            </a>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="space-x-2 text-xs">
              <Link href="/posts/create-post">
                <a>
                  <span className="cursor-pointer hover:underline">글쓰기</span>
                </a>
              </Link>
              <span className="cursor-pointer hover:underline">로그아웃</span>
            </div>
          ) : (
            <div className="space-x-2 text-xs">
              <Link href="/login">
                <a>
                  <span className="cursor-pointer hover:underline">로그인</span>
                </a>
              </Link>
              <Link href={'/create-account'}>
                <a>
                  <span className="cursor-pointer hover:underline">
                    계정만들기
                  </span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="w-full">{children}</main>
    </div>
  )
}

export default Layout
