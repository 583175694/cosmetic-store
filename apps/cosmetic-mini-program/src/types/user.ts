// 用户相关类型定义
export interface User {
  id: string
  openId: string
  nickname: string
  avatar: string
  phone?: string
  memberLevel: 'normal' | 'silver' | 'gold' | 'diamond'
  points: number
  createdAt: Date
}

export interface UserProfile extends User {
  email?: string
  birthday?: Date
  gender?: 'male' | 'female' | 'other'
  preferences?: string[]
}