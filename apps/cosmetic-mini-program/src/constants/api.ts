// API相关常量
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.cosmetic-studio.com' 
  : 'https://dev-api.cosmetic-studio.com'

export const API_ENDPOINTS = {
  // 用户相关
  USER_LOGIN: '/api/user/login',
  USER_PROFILE: '/api/user/profile',
  USER_UPDATE: '/api/user/update',
  
  // 服务相关
  SERVICES_LIST: '/api/services',
  SERVICE_DETAIL: '/api/services/:id',
  SERVICE_CATEGORIES: '/api/services/categories',
  
  // 化妆师相关
  ARTISTS_LIST: '/api/artists',
  ARTIST_DETAIL: '/api/artists/:id',
  ARTIST_SCHEDULE: '/api/artists/:id/schedule',
  
  // 预约相关
  BOOKING_CREATE: '/api/bookings',
  BOOKING_LIST: '/api/bookings',
  BOOKING_DETAIL: '/api/bookings/:id',
  BOOKING_CANCEL: '/api/bookings/:id/cancel',
  
  // 作品相关
  PORTFOLIOS_LIST: '/api/portfolios',
  PORTFOLIO_DETAIL: '/api/portfolios/:id',
  
  // 评价相关
  REVIEWS_LIST: '/api/reviews',
  REVIEW_CREATE: '/api/reviews',
  
  // 优惠券相关
  COUPONS_LIST: '/api/coupons',
  COUPON_USE: '/api/coupons/:id/use',
  
  // 支付相关
  PAYMENT_CREATE: '/api/payments',
  PAYMENT_CALLBACK: '/api/payments/callback'
} as const