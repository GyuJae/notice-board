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
    <div className="relative mx-auto max-w-3xl pl-16">
      <Head>
        <title>{title} | Notice</title>
      </Head>
      <nav className="absolute left-0 flex h-full w-16 list-none flex-col items-center space-y-3 bg-gray-800 py-5">
        <li className="sidebar-icon group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="sidebar-tooltip group-hover:scale-100">
            친구 추가하기
          </span>
        </li>
        <li className="sidebar-icon group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sidebar-tooltip group-hover:scale-100">
            설정하기
          </span>
        </li>
      </nav>
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
