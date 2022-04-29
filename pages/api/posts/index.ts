import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'
import { Post } from '@prisma/client'

export interface PostWithUser extends Post {
  user: {
    id: number
    name: string
  }
  _count: {
    postLikes: number
    comments: number
  }
}

export interface IPosts extends IResponse {
  posts?: PostWithUser[]
}
export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPosts>
) {
  try {
    const posts = await prisma?.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            postLikes: true,
            comments: true,
          },
        },
      },
    })
    return res.status(201).json({
      ok: true,
      posts,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error,
    })
  }
}

export default withApiSession(withHandler(['GET'], handler))
