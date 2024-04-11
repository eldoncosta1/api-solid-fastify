import { Checkin, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create: (data: Prisma.CheckinUncheckedCreateInput) => Promise<Checkin>
  save: (data: Checkin) => Promise<Checkin>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<Checkin | null>
}
