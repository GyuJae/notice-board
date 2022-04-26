import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'
import { Comment, Post, User } from '@prisma/client'

export interface CommentWithUser extends Comment {
  user: User
  _count: {
    commentLikes: number
  }
}

interface PostWithUserAndComment extends Post {
  user: {
    id: number
    name: string
  }
  comments: CommentWithUser[]
  _count: {
    comments: number
    postLikes: number
  }
}

export interface IFindPost extends IResponse {
  post?: PostWithUserAndComment
  isMine: boolean
  isLike: boolean
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFindPost>
) {
  try {
    const {
      session: { user },
      query: { id: postId },
    } = req
    const post = await prisma?.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: true,
            _count: {
              select: {
                commentLikes: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
            postLikes: true,
          },
        },
      },
    })
    if (!post) {
      return res.status(404).json({
        ok: false,
        error: 'Post not found',
        isMine: false,
        isLike: false,
      })
    }
    const existUser = await prisma?.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
      },
    })
    let postLike
    if (existUser) {
      postLike = await prisma?.postLike.findUnique({
        where: {
          userId_postId: {
            userId: existUser.id,
            postId: post.id,
          },
        },
      })
    }
    return res.status(201).json({
      ok: true,
      post,
      isMine: user ? post.userId === user.id : false,
      isLike: Boolean(postLike),
    })
  } catch (error) {
    return res.json({
      ok: false,
      error,
      isMine: false,
      isLike: false,
    })
  }
}

export default withApiSession(withHandler(['GET'], handler))
