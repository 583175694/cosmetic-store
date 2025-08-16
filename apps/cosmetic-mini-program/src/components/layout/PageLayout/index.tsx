import React, { ReactNode } from 'react'
import { View } from '@tarojs/components'
import { LoadingSpinner, EmptyState } from '../../common'
import './index.scss'

interface PageLayoutProps {
  /** 页面内容 */
  children: ReactNode
  /** 是否显示加载状态 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 是否显示空状态 */
  empty?: boolean
  /** 空状态配置 */
  emptyProps?: {
    image?: string
    title?: string
    description?: string
    buttonText?: string
    onButtonClick?: () => void
  }
  /** 是否有错误 */
  error?: boolean
  /** 错误信息 */
  errorMessage?: string
  /** 错误重试回调 */
  onRetry?: () => void
  /** 自定义类名 */
  className?: string
  /** 是否启用下拉刷新 */
  enablePullRefresh?: boolean
  /** 下拉刷新回调 */
  onPullRefresh?: () => void
  /** 是否启用上拉加载 */
  enableReachBottom?: boolean
  /** 上拉加载回调 */
  onReachBottom?: () => void
  /** 页面背景色 */
  backgroundColor?: string
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  loading = false,
  loadingText,
  empty = false,
  emptyProps,
  error = false,
  errorMessage = '页面加载失败',
  onRetry,
  className = '',
  backgroundColor
}) => {
  const containerStyle = backgroundColor ? { backgroundColor } : {}

  // 错误状态
  if (error) {
    return (
      <View className={`page-layout ${className}`} style={containerStyle}>
        <EmptyState
          title="加载失败"
          description={errorMessage}
          buttonText={onRetry ? "重试" : undefined}
          onButtonClick={onRetry}
        />
      </View>
    )
  }

  // 加载状态
  if (loading) {
    return (
      <View className={`page-layout ${className}`} style={containerStyle}>
        <LoadingSpinner text={loadingText} fullscreen />
      </View>
    )
  }

  // 空状态
  if (empty) {
    return (
      <View className={`page-layout ${className}`} style={containerStyle}>
        <EmptyState {...emptyProps} />
      </View>
    )
  }

  // 正常内容
  return (
    <View className={`page-layout ${className}`} style={containerStyle}>
      <View className="page-layout__content">
        {children}
      </View>
    </View>
  )
}

export default PageLayout