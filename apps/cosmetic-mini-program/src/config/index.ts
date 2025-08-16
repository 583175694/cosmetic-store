// 项目配置文件
import { API_BASE_URL } from '../constants/api'

export interface AppConfig {
  apiBaseUrl: string
  debug: boolean
  version: string
  platform: string
}

export const config: AppConfig = {
  apiBaseUrl: process.env.API_BASE_URL || API_BASE_URL,
  debug: process.env.NODE_ENV === 'development',
  version: '1.0.0',
  platform: process.env.TARO_ENV || 'weapp'
}

export default config