// 应用相关常量
export const APP_CONFIG = {
  NAME: '化妆工作室',
  VERSION: '1.0.0',
  DESCRIPTION: '专业化妆服务预约平台'
} as const

export const TAB_BAR_CONFIG = {
  HOME: {
    pagePath: 'pages/home/index',
    text: '首页',
    iconPath: 'assets/icons/home.png',
    selectedIconPath: 'assets/icons/home-active.png'
  },
  SERVICES: {
    pagePath: 'pages/services/index',
    text: '服务',
    iconPath: 'assets/icons/services.png',
    selectedIconPath: 'assets/icons/services-active.png'
  },
  PORTFOLIO: {
    pagePath: 'pages/portfolio/index',
    text: '作品',
    iconPath: 'assets/icons/portfolio.png',
    selectedIconPath: 'assets/icons/portfolio-active.png'
  },
  PROFILE: {
    pagePath: 'pages/profile/index',
    text: '我的',
    iconPath: 'assets/icons/profile.png',
    selectedIconPath: 'assets/icons/profile-active.png'
  }
} as const

export const SERVICE_CATEGORIES = {
  MAKEUP: { id: 'makeup', name: '化妆服务', icon: '💄' },
  TUTORIAL: { id: 'tutorial', name: '化妆私教', icon: '👩‍🏫' },
  TATTOO: { id: 'tattoo', name: '半永久纹绣', icon: '🎨' },
  EYELASH: { id: 'eyelash', name: '精致美睫', icon: '👁️' }
} as const

export const BOOKING_STATUS = {
  PENDING: { value: 'pending', label: '待确认', color: '#FF9800' },
  CONFIRMED: { value: 'confirmed', label: '已确认', color: '#2196F3' },
  COMPLETED: { value: 'completed', label: '已完成', color: '#4CAF50' },
  CANCELLED: { value: 'cancelled', label: '已取消', color: '#F44336' }
} as const