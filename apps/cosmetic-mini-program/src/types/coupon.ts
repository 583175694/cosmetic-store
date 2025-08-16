// 优惠券相关类型定义
export interface Coupon {
  id: string
  name: string
  type: 'discount' | 'cash' | 'newUser'
  value: number // 折扣值或现金值
  minAmount?: number // 最小使用金额
  validFrom: Date
  validTo: Date
  isUsed: boolean
  usedAt?: Date
}