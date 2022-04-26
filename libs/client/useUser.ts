import { User } from '@prisma/client'
import { IMe } from 'pages/api/users/me'
import useSWR from 'swr'

interface IUseUser {
  user?: User
  isLoading: boolean
}

export default function useUser(): IUseUser {
  const { data, error } = useSWR<IMe>('/api/users/me')

  return {
    user: data?.user,
    isLoading: !data && !error,
  }
}
