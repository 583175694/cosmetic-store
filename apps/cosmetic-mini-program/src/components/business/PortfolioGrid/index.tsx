import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Portfolio } from '../../../types/portfolio'
import './index.scss'

interface PortfolioGridProps {
  /** 作品列表 */
  portfolios: Portfolio[]
  /** 列数 */
  columns?: number
  /** 作品点击回调 */
  onItemClick?: (portfolio: Portfolio) => void
  /** 自定义类名 */
  className?: string
  /** 是否显示瀑布流 */
  waterfall?: boolean
  /** 是否显示作品信息 */
  showInfo?: boolean
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  portfolios,
  columns = 2,
  onItemClick,
  className = '',
  waterfall = false,
  showInfo = true
}) => {
  const handleItemClick = (portfolio: Portfolio) => {
    onItemClick?.(portfolio)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    })
  }

  // 瀑布流布局需要计算每列的高度
  const getColumnItems = () => {
    if (!waterfall) return [portfolios]
    
    const columnArrays: Portfolio[][] = Array.from({ length: columns }, () => [])
    const columnHeights = Array(columns).fill(0)
    
    portfolios.forEach((portfolio) => {
      // 找到最短的列
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columnArrays[shortestColumnIndex].push(portfolio)
      // 简单估算高度，实际应该根据图片比例计算
      columnHeights[shortestColumnIndex] += 200 + (showInfo ? 80 : 0)
    })
    
    return columnArrays
  }

  const columnItems = getColumnItems()

  return (
    <View className={`portfolio-grid ${waterfall ? 'portfolio-grid--waterfall' : ''} ${className}`}>
      {waterfall ? (
        // 瀑布流布局
        <View className="portfolio-grid__waterfall">
          {columnItems.map((columnPortfolios, columnIndex) => (
            <View key={columnIndex} className="portfolio-grid__column">
              {columnPortfolios.map((portfolio) => (
                <View
                  key={portfolio.id}
                  className="portfolio-grid__item"
                  onClick={() => handleItemClick(portfolio)}
                >
                  <View className="portfolio-grid__image-container">
                    <Image
                      src={portfolio.images[0]}
                      className="portfolio-grid__image"
                      mode="aspectFill"
                    />
                    {portfolio.video && (
                      <View className="portfolio-grid__video-indicator">
                        <Text className="portfolio-grid__video-icon">▶</Text>
                      </View>
                    )}
                  </View>
                  
                  {showInfo && (
                    <View className="portfolio-grid__info">
                      <Text className="portfolio-grid__title" numberOfLines={2}>
                        {portfolio.title}
                      </Text>
                      <View className="portfolio-grid__meta">
                        <Text className="portfolio-grid__likes">
                          ❤ {portfolio.likes}
                        </Text>
                        <Text className="portfolio-grid__date">
                          {formatDate(portfolio.createdAt)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      ) : (
        // 网格布局
        <View 
          className="portfolio-grid__grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {portfolios.map((portfolio) => (
            <View
              key={portfolio.id}
              className="portfolio-grid__item"
              onClick={() => handleItemClick(portfolio)}
            >
              <View className="portfolio-grid__image-container">
                <Image
                  src={portfolio.images[0]}
                  className="portfolio-grid__image"
                  mode="aspectFill"
                />
                {portfolio.video && (
                  <View className="portfolio-grid__video-indicator">
                    <Text className="portfolio-grid__video-icon">▶</Text>
                  </View>
                )}
              </View>
              
              {showInfo && (
                <View className="portfolio-grid__info">
                  <Text className="portfolio-grid__title" numberOfLines={2}>
                    {portfolio.title}
                  </Text>
                  <View className="portfolio-grid__meta">
                    <Text className="portfolio-grid__likes">
                      ❤ {portfolio.likes}
                    </Text>
                    <Text className="portfolio-grid__date">
                      {formatDate(portfolio.createdAt)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default PortfolioGrid