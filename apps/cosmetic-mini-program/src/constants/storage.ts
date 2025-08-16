// 本地存储相关常量
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_INFO: 'user_info',
  BOOKING_DRAFT: 'booking_draft',
  SEARCH_HISTORY: 'search_history',
  APP_SETTINGS: 'app_settings'
} as const

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5分钟
  MEDIUM: 30 * 60 * 1000, // 30分钟
  LONG: 24 * 60 * 60 * 1000 // 24小时
} as const