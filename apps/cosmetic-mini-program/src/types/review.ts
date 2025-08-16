// 评价相关类型定义
export interface Review {
  id: string
  userId: string
  bookingId: string
  artistId: string
  serviceId: string
  rating: number
  comment: string
  images?: string[]
  createdAt: Date
}