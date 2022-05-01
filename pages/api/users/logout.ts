import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import bcrypt from 'bcrypt'
import { withApiSession } from '@libs/server/withSession'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    req.session.user = undefined
    await req.session.save()
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
