import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/client/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import bcrypt from 'bcrypt'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    const {
      body: { email, password },
    } = req
    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    })
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'This email is wrong.',
      })
    }
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) {
      return res.status(401).json({
        ok: false,
        error: 'Password is wrong.',
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

export default withHandler(['POST'], handler)
