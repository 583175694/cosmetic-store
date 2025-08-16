// 服务相关类型定义
export interface Service {
  id: string
  name: string
  category: 'makeup' | 'tutorial' | 'tattoo' | 'eyelash'
  description: string
  images: string[]
  duration: number // 分钟
  price: number
  deposit: number // 定金
  isActive: boolean
  tags: string[]
}

export interface ServiceCategory {
  id: string
  name: string
  icon: string
  description: string
  services: Service[]
}