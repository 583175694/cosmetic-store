// 化妆师相关类型定义
export interface WorkingHour {
  dayOfWeek: number // 0-6, 0为周日
  startTime: string // HH:mm
  endTime: string // HH:mm
  isAvailable: boolean
}

export interface Artist {
  id: string
  name: string
  avatar: string
  title: string
  description: string
  experience: number
  specialties: string[]
  rating: number
  reviewCount: number
  certificates: string[]
  portfolios: string[]
  workingHours: WorkingHour[]
}