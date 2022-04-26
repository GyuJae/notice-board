import type { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import { IResponse } from '@libs/server/types'
import prisma from '@libs/server/client'
import bcrypt from 'bcrypt'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  try {
    const {
      body: { email, password, name },
    } = req
    const existEmail = await prisma?.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
    if (existEmail) {
      return res.status(409).json({
        ok: false,
        error: 'This Email already exists.',
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    await prisma?.user.create({
      data: {
        email,
        password: hashPassword,
        name,
      },
    })
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
