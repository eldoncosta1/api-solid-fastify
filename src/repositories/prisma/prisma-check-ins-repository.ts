import { prisma } from '@/lib/prisma'
import { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { ICheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const checkins = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkins
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkin = await prisma.checkin.create({
      data,
    })

    return checkin
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkin = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkin
  }

  async findById(id: string): Promise<Checkin | null> {
    const checkin = await prisma.checkin.findUnique({
      where: {
        id,
      },
    })

    return checkin
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkin = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkin
  }
}
