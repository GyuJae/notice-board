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
      body: { commentId },
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
    const comment = await prisma?.comment.findUnique({
      where: {
        id: +commentId,
      },
      select: {
        id: true,
      },
    })
    if (!comment) {
      return res.status(401).json({
        ok: false,
        error: 'This comment id does not exist.',
      })
    }
    const commentLike = await prisma?.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: existUser.id,
          commentId: comment.id,
        },
      },
      select: {
        id: true,
      },
    })
    if (commentLike) {
      await prisma?.commentLike.delete({
        where: {
          id: commentLike.id,
        },
      })
    } else {
      await prisma?.commentLike.create({
        data: {
          userId: existUser.id,
          commentId: comment.id,
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
