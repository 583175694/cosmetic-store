import React from 'react'
import { View } from '@tarojs/components'
import { Loading } from '@taroify/core'
import './index.scss'

interface LoadingSpinnerProps {
  /** 加载文本 */
  text?: string
  /** 尺寸大小 */
  size?: 'small' | 'medium' | 'large'
  /** 是否显示 */
  visible?: boolean
  /** 自定义类名 */
  className?: string
  /** 是否全屏显示 */
  fullscreen?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = '加载中...',
  size = 'medium',
  visible = true,
  className = '',
  fullscreen = false
}) => {
  if (!visible) return null

  const containerClass = `loading-spinner ${fullscreen ? 'loading-spinner--fullscreen' : ''} ${className}`

  return (
    <View className={containerClass}>
      <View className="loading-spinner__content">
        <Loading size={size} className="loading-spinner__icon" />
        {text && (
          <View className="loading-spinner__text">{text}</View>
        )}
      </View>
    </View>
  )
}

export default LoadingSpinner