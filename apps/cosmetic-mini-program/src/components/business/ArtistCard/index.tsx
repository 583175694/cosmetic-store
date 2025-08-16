import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Button } from '@taroify/core'
import { RatingStars } from '../../common'
import { Artist } from '../../../types/artist'
import './index.scss'

interface ArtistCardProps {
  /** 化妆师数据 */
  artist: Artist
  /** 卡片模式 */
  mode?: 'default' | 'compact' | 'horizontal'
  /** 选择化妆师回调 */
  onSelect?: (artist: Artist) => void
  /** 卡片点击回调 */
  onClick?: (artist: Artist) => void
  /** 自定义类名 */
  className?: string
  /** 是否显示选择按钮 */
  showSelectButton?: boolean
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  mode = 'default',
  onSelect,
  onClick,
  className = '',
  showSelectButton = true
}) => {
  const handleCardClick = () => {
    onClick?.(artist)
  }

  const handleSelectClick = (e: any) => {
    e.stopPropagation()
    onSelect?.(artist)
  }

  const formatExperience = (years: number) => {
    return `${years}年经验`
  }

  return (
    <View 
      className={`artist-card artist-card--${mode} ${className}`}
      onClick={handleCardClick}
    >
      <View className="artist-card__avatar-container">
        <Image 
          src={artist.avatar} 
          className="artist-card__avatar"
          mode="aspectFill"
        />
        {artist.certificates.length > 0 && (
          <View className="artist-card__badge">
            认证
          </View>
        )}
      </View>

      <View className="artist-card__content">
        <View className="artist-card__header">
          <Text className="artist-card__name">{artist.name}</Text>
          <Text className="artist-card__title">{artist.title}</Text>
        </View>

        <View className="artist-card__rating">
          <RatingStars 
            value={artist.rating} 
            size="small" 
            showValue 
          />
          <Text className="artist-card__review-count">
            ({artist.reviewCount}条评价)
          </Text>
        </View>

        {mode !== 'compact' && (
          <>
            <Text className="artist-card__experience">
              {formatExperience(artist.experience)}
            </Text>

            {artist.specialties.length > 0 && (
              <View className="artist-card__specialties">
                <Text className="artist-card__specialties-label">擅长：</Text>
                <Text className="artist-card__specialties-text">
                  {artist.specialties.slice(0, 3).join('、')}
                </Text>
              </View>
            )}
          </>
        )}

        {showSelectButton && mode !== 'compact' && (
          <Button 
            className="artist-card__select-button"
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleSelectClick}
          >
            选择TA
          </Button>
        )}
      </View>
    </View>
  )
}

export default ArtistCard