import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Button } from '@taroify/core'
import './index.scss'

interface EmptyStateProps {
  /** 空状态图片 */
  image?: string
  /** 标题 */
  title?: string
  /** 描述文本 */
  description?: string
  /** 按钮文本 */
  buttonText?: string
  /** 按钮点击事件 */
  onButtonClick?: () => void
  /** 自定义类名 */
  className?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title = '暂无数据',
  description,
  buttonText,
  onButtonClick,
  className = ''
}) => {
  return (
    <View className={`empty-state ${className}`}>
      {image && (
        <Image 
          src={image} 
          className="empty-state__image"
          mode="aspectFit"
        />
      )}
      
      <View className="empty-state__content">
        <Text className="empty-state__title">{title}</Text>
        
        {description && (
          <Text className="empty-state__description">{description}</Text>
        )}
        
        {buttonText && onButtonClick && (
          <Button 
            className="empty-state__button"
            variant="outlined"
            color="primary"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </View>
    </View>
  )
}

export default EmptyState