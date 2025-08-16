// 作品相关类型定义
export interface Portfolio {
  id: string
  title: string
  description: string
  images: string[]
  video?: string
  artistId: string
  serviceId: string
  tags: string[]
  likes: number
  createdAt: Date
}