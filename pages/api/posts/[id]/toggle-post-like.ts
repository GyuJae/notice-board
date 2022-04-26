import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    const {
      session: { user },
      query: { id: postId },
    } = req
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'You should login',
      })
    }
    const existUser = await prisma?.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
      },
    })
    if (!existUser) {
      return res.status(400).json({
        ok: false,
        error: 'This Session user id is wrong.',
      })
    }
    const post = await prisma?.post.findUnique({
      where: {
        id: +postId,
      },
      select: {
        id: true,
      },
    })
    if (!post) {
      return res.status(404).json({
        ok: false,
        error: 'This post id does not exist.',
      })
    }
    const postLike = await prisma?.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
      select: {
        id: true,
      },
    })
    if (postLike) {
      await prisma?.postLike.delete({
        where: {
          id: postLike.id,
        },
      })
    } else {
      await prisma?.postLike.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      })
    }
    return res.status(201).json({
      ok: true,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error,
    })
  }
}

export default withApiSession(withHandler(['POST'], handler))
