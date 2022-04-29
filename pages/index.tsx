import type { NextPage } from 'next'
import Layout from '@components/Layout'
import useSWR from 'swr'
import { IPosts } from './api/posts'
import LoadingSpiner from '@components/LoadingSpiner'
import Post from '@components/Post'

const Home: NextPage = () => {
  const { data, error } = useSWR<IPosts>('/api/posts')

  if (!data || error) {
    return (
      <Layout title="홈">
        <div className="flex items-center justify-center py-20">
          <LoadingSpiner />
        </div>
      </Layout>
    )
  }
  return (
    <Layout title="홈">
      <div>
        {data.posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default Home
