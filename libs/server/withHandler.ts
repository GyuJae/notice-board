import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/server/client'
import { IResponse } from '@libs/server/types'

type Method = 'GET' | 'POST' | 'DELETE'

export default function withHandler(
  methods: Method[],
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse<IResponse>) {
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end()
    }
    try {
      if (!prisma) {
        return res.status(400).json({ ok: false, error: 'Prisma Null' })
      }
      await fn(req, res)
    } catch (error) {
      return res.status(500).json({ ok: false, error })
    }
  }
}
