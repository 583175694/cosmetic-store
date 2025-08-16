import React from 'react'
import { View } from '@tarojs/components'
import { Star, StarOutlined } from '@taroify/icons'
import './index.scss'

interface RatingStarsProps {
  /** 评分值 */
  value?: number
  /** 最大评分 */
  max?: number
  /** 是否可交互 */
  interactive?: boolean
  /** 星星大小 */
  size?: 'small' | 'medium' | 'large'
  /** 评分改变回调 */
  onChange?: (value: number) => void
  /** 自定义类名 */
  className?: string
  /** 是否显示评分数值 */
  showValue?: boolean
  /** 是否允许半星 */
  allowHalf?: boolean
}

const RatingStars: React.FC<RatingStarsProps> = ({
  value = 0,
  max = 5,
  interactive = false,
  size = 'medium',
  onChange,
  className = '',
  showValue = false,
  allowHalf = false
}) => {
  const handleStarClick = (starIndex: number) => {
    if (!interactive || !onChange) return
    
    const newValue = starIndex + 1
    onChange(newValue)
  }

  const handleStarHalfClick = (starIndex: number) => {
    if (!interactive || !onChange || !allowHalf) return
    
    const newValue = starIndex + 0.5
    onChange(newValue)
  }

  const renderStar = (starIndex: number) => {
    const isFilled = starIndex < Math.floor(value)
    const isHalfFilled = allowHalf && starIndex === Math.floor(value) && value % 1 !== 0
    
    return (
      <View 
        key={starIndex}
        className={`rating-stars__star ${interactive ? 'rating-stars__star--interactive' : ''}`}
        onClick={() => handleStarClick(starIndex)}
      >
        {allowHalf && interactive && (
          <View 
            className="rating-stars__star-half"
            onClick={(e) => {
              e.stopPropagation()
              handleStarHalfClick(starIndex)
            }}
          />
        )}
        
        {isFilled || isHalfFilled ? (
          <Star 
            className={`rating-stars__icon rating-stars__icon--filled ${isHalfFilled ? 'rating-stars__icon--half' : ''}`}
          />
        ) : (
          <StarOutlined className="rating-stars__icon rating-stars__icon--empty" />
        )}
      </View>
    )
  }

  const stars = Array.from({ length: max }, (_, index) => renderStar(index))

  return (
    <View className={`rating-stars rating-stars--${size} ${className}`}>
      <View className="rating-stars__container">
        {stars}
      </View>
      
      {showValue && (
        <View className="rating-stars__value">
          {value.toFixed(allowHalf ? 1 : 0)}
        </View>
      )}
    </View>
  )
}

export default RatingStars