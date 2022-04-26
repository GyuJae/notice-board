import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'
import { Comment } from '@prisma/client'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    const {
      body: { content },
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
      return res.status(404).json({
        ok: false,
        error: 'User id does not exist.',
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
      return res.status(403).json({
        ok: false,
        error: 'Post id is wrong.',
      })
    }

    const comment = await prisma?.comment.create({
      data: {
        content,
        userId: existUser.id,
        postId: post.id,
      },
      select: {
        id: true,
      },
    })
    if (!comment) {
      return res.status(403).json({
        ok: false,
        error: 'Create Comment Error',
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
