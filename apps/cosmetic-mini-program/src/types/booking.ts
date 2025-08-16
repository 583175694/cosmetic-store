// 预约相关类型定义
export interface Booking {
  id: string
  userId: string
  serviceId: string
  artistId: string
  appointmentTime: Date
  duration: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
  depositPaid: number
  remainingPrice: number
  notes?: string
  createdAt: Date
}

export interface BookingData {
  serviceId: string
  artistId: string
  appointmentTime: Date
  notes?: string
}