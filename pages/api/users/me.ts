import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'
import { User } from '@prisma/client'

interface IMe extends IResponse {
  user?: User
}

export async function handler(req: NextApiRequest, res: NextApiResponse<IMe>) {
  try {
    const { session } = req
    if (!session.user) {
      return res.status(404).json({
        ok: false,
        error: 'User not saved in session',
      })
    }
    const user = await prisma?.user.findUnique({
      where: {
        id: session.user.id,
      },
    })
    if (!user) {
      return res.status(404).json({
        ok: false,
        error: 'User not found.',
      })
    }

    return res.status(200).json({
      ok: true,
      user,
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    })
  }
}

export default withApiSession(withHandler(['GET'], handler))
