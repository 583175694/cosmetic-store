import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Button } from '@taroify/core'
import { Service } from '../../../types/service'
import './index.scss'

interface ServiceCardProps {
  /** 服务数据 */
  service: Service
  /** 卡片模式 */
  mode?: 'default' | 'compact' | 'detailed'
  /** 预约按钮点击回调 */
  onBook?: (service: Service) => void
  /** 卡片点击回调 */
  onClick?: (service: Service) => void
  /** 自定义类名 */
  className?: string
  /** 是否显示预约按钮 */
  showBookButton?: boolean
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  mode = 'default',
  onBook,
  onClick,
  className = '',
  showBookButton = true
}) => {
  const handleCardClick = () => {
    onClick?.(service)
  }

  const handleBookClick = (e: any) => {
    e.stopPropagation()
    onBook?.(service)
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}分钟`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}小时${remainingMinutes}分钟` : `${hours}小时`
  }

  const formatPrice = (price: number) => {
    return `¥${price}`
  }

  return (
    <View 
      className={`service-card service-card--${mode} ${className}`}
      onClick={handleCardClick}
    >
      <View className="service-card__image-container">
        <Image 
          src={service.images[0] || ''} 
          className="service-card__image"
          mode="aspectFill"
        />
        {service.tags.length > 0 && (
          <View className="service-card__tags">
            {service.tags.slice(0, 2).map((tag, index) => (
              <View key={index} className="service-card__tag">
                {tag}
              </View>
            ))}
          </View>
        )}
      </View>

      <View className="service-card__content">
        <View className="service-card__header">
          <Text className="service-card__title">{service.name}</Text>
          <Text className="service-card__price">{formatPrice(service.price)}</Text>
        </View>

        {mode !== 'compact' && (
          <Text className="service-card__description" numberOfLines={2}>
            {service.description}
          </Text>
        )}

        <View className="service-card__meta">
          <Text className="service-card__duration">
            时长: {formatDuration(service.duration)}
          </Text>
          {service.deposit > 0 && (
            <Text className="service-card__deposit">
              定金: {formatPrice(service.deposit)}
            </Text>
          )}
        </View>

        {showBookButton && mode !== 'compact' && (
          <Button 
            className="service-card__book-button"
            size="small"
            color="primary"
            onClick={handleBookClick}
          >
            立即预约
          </Button>
        )}
      </View>
    </View>
  )
}

export default ServiceCard