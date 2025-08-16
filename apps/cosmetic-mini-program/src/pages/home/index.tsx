import { View, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Swiper } from '@taroify/core'
import { useState, useEffect } from 'react'
import { Banner } from '../../types/common'
import { Portfolio } from '../../types/portfolio'
import { Artist } from '../../types/artist'
import PortfolioGrid from '../../components/business/PortfolioGrid'
import ArtistCard from '../../components/business/ArtistCard'
import './index.scss'

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [portfolioLoading, setPortfolioLoading] = useState(true)
  const [artistLoading, setArtistLoading] = useState(true)

  useEffect(() => {
    console.log('Home page loaded.')
    loadBanners()
    loadPortfolios()
    loadArtists()
  }, [])

  // 加载Banner数据
  const loadBanners = async () => {
    try {
      // 模拟API调用，实际项目中应该调用真实API
      const mockBanners: Banner[] = [
        {
          id: '1',
          title: '专业新娘化妆',
          image: 'https://via.placeholder.com/750x300/F5F1EB/333?text=专业新娘化妆',
          link: '/pages/services/detail/index?id=1',
          linkType: 'service',
          isActive: true,
          sortOrder: 1
        },
        {
          id: '2',
          title: '化妆私教课程',
          image: 'https://via.placeholder.com/750x300/E8F4F8/333?text=化妆私教课程',
          link: '/pages/services/detail/index?id=2',
          linkType: 'service',
          isActive: true,
          sortOrder: 2
        },
        {
          id: '3',
          title: '精致美睫服务',
          image: 'https://via.placeholder.com/750x300/F4C2C2/333?text=精致美睫服务',
          link: '/pages/services/detail/index?id=3',
          linkType: 'service',
          isActive: true,
          sortOrder: 3
        }
      ]
      
      setBanners(mockBanners.filter(banner => banner.isActive).sort((a, b) => a.sortOrder - b.sortOrder))
    } catch (error) {
      console.error('加载Banner失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 加载作品推荐数据
  const loadPortfolios = async () => {
    try {
      // 模拟API调用，实际项目中应该调用真实API
      const mockPortfolios: Portfolio[] = [
        {
          id: '1',
          title: '清新自然新娘妆',
          description: '适合户外婚礼的清新自然妆容',
          images: ['https://via.placeholder.com/300x400/F5F1EB/333?text=新娘妆1'],
          artistId: '1',
          serviceId: '1',
          tags: ['新娘妆', '自然', '清新'],
          likes: 128,
          createdAt: new Date('2024-01-15')
        },
        {
          id: '2',
          title: '复古红唇妆容',
          description: '经典复古风格红唇妆容',
          images: ['https://via.placeholder.com/300x500/E8F4F8/333?text=复古妆'],
          artistId: '2',
          serviceId: '1',
          tags: ['复古', '红唇', '经典'],
          likes: 95,
          createdAt: new Date('2024-01-14')
        },
        {
          id: '3',
          title: '日系甜美妆容',
          description: '温柔甜美的日系妆容',
          images: ['https://via.placeholder.com/300x350/F4C2C2/333?text=日系妆'],
          artistId: '1',
          serviceId: '1',
          tags: ['日系', '甜美', '温柔'],
          likes: 156,
          createdAt: new Date('2024-01-13')
        },
        {
          id: '4',
          title: '欧美烟熏妆',
          description: '性感迷人的欧美烟熏妆容',
          images: ['https://via.placeholder.com/300x450/D4AF37/333?text=烟熏妆'],
          artistId: '3',
          serviceId: '1',
          tags: ['欧美', '烟熏', '性感'],
          likes: 203,
          createdAt: new Date('2024-01-12')
        },
        {
          id: '5',
          title: '韩式裸妆',
          description: '自然透亮的韩式裸妆',
          images: ['https://via.placeholder.com/300x380/F5F1EB/333?text=韩式裸妆'],
          artistId: '2',
          serviceId: '1',
          tags: ['韩式', '裸妆', '自然'],
          likes: 87,
          createdAt: new Date('2024-01-11')
        },
        {
          id: '6',
          title: '精致美睫效果',
          description: '自然卷翘的美睫嫁接效果',
          images: ['https://via.placeholder.com/300x320/E8F4F8/333?text=美睫'],
          artistId: '4',
          serviceId: '4',
          tags: ['美睫', '嫁接', '自然'],
          likes: 142,
          createdAt: new Date('2024-01-10')
        }
      ]
      
      setPortfolios(mockPortfolios)
    } catch (error) {
      console.error('加载作品失败:', error)
    } finally {
      setPortfolioLoading(false)
    }
  }

  // 处理Banner点击
  const handleBannerClick = (banner: Banner) => {
    if (!banner.link) return
    
    switch (banner.linkType) {
      case 'page':
      case 'service':
      case 'portfolio':
        Taro.navigateTo({ url: banner.link })
        break
      case 'webview':
        Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(banner.link)}` })
        break
      default:
        console.log('未知的链接类型:', banner.linkType)
    }
  }

  // 加载明星化妆师数据
  const loadArtists = async () => {
    try {
      // 模拟API调用，实际项目中应该调用真实API
      const mockArtists: Artist[] = [
        {
          id: '1',
          name: '李美妆',
          avatar: 'https://via.placeholder.com/120x120/F5F1EB/333?text=李美妆',
          title: '首席化妆师',
          description: '专业从事化妆行业8年，擅长新娘妆、时尚妆容设计',
          experience: 8,
          specialties: ['新娘妆', '时尚妆', '影楼妆'],
          rating: 4.9,
          reviewCount: 156,
          certificates: ['高级化妆师证书', 'CIDESCO国际证书'],
          portfolios: ['1', '3'],
          workingHours: []
        },
        {
          id: '2',
          name: '王艺术',
          avatar: 'https://via.placeholder.com/120x120/E8F4F8/333?text=王艺术',
          title: '资深化妆师',
          description: '国际化妆大赛获奖者，专注于创意妆容设计',
          experience: 6,
          specialties: ['创意妆', '舞台妆', '影视妆'],
          rating: 4.8,
          reviewCount: 98,
          certificates: ['高级化妆师证书'],
          portfolios: ['2', '4'],
          workingHours: []
        },
        {
          id: '3',
          name: '张时尚',
          avatar: 'https://via.placeholder.com/120x120/F4C2C2/333?text=张时尚',
          title: '化妆导师',
          description: '10年化妆教学经验，培养了众多优秀化妆师',
          experience: 10,
          specialties: ['教学培训', '日常妆', '职场妆'],
          rating: 4.9,
          reviewCount: 203,
          certificates: ['高级化妆师证书', '化妆培训师证书'],
          portfolios: ['5'],
          workingHours: []
        }
      ]
      
      setArtists(mockArtists)
    } catch (error) {
      console.error('加载化妆师失败:', error)
    } finally {
      setArtistLoading(false)
    }
  }

  // 处理作品点击
  const handlePortfolioClick = (portfolio: Portfolio) => {
    Taro.navigateTo({ url: `/pages/portfolio/detail/index?id=${portfolio.id}` })
  }

  // 处理化妆师点击
  const handleArtistClick = (artist: Artist) => {
    Taro.navigateTo({ url: `/pages/artists/detail/index?id=${artist.id}` })
  }

  return (
    <View className='home-page'>
      {/* Banner轮播 */}
      <View className='banner-section'>
        {loading ? (
          <View className='banner-loading'>
            <View className='loading-placeholder'></View>
          </View>
        ) : (
          <Swiper
            className='banner-swiper'
            autoplay={3000}
            circular
            indicatorDots
            indicatorColor='rgba(255, 255, 255, 0.5)'
            indicatorActiveColor='#D4AF37'
          >
            {banners.map((banner) => (
              <Swiper.Item key={banner.id}>
                <View 
                  className='banner-item'
                  onClick={() => handleBannerClick(banner)}
                >
                  <Image
                    className='banner-image'
                    src={banner.image}
                    mode='aspectFill'
                    lazyLoad
                  />
                  <View className='banner-overlay'>
                    <View className='banner-title'>{banner.title}</View>
                  </View>
                </View>
              </Swiper.Item>
            ))}
          </Swiper>
        )}
      </View>

      {/* 服务入口网格 */}
      <View className='services-section'>
        <View className='section-title'>我们的服务</View>
        <View className='services-grid'>
          <View 
            className='service-item'
            onClick={() => Taro.navigateTo({ url: '/pages/services/category/index?category=makeup' })}
          >
            <View className='service-icon'>💄</View>
            <View className='service-name'>化妆服务</View>
            <View className='service-desc'>专业化妆造型</View>
          </View>
          
          <View 
            className='service-item'
            onClick={() => Taro.navigateTo({ url: '/pages/services/category/index?category=tutorial' })}
          >
            <View className='service-icon'>👩‍🏫</View>
            <View className='service-name'>化妆私教</View>
            <View className='service-desc'>一对一教学</View>
          </View>
          
          <View 
            className='service-item'
            onClick={() => Taro.navigateTo({ url: '/pages/services/category/index?category=tattoo' })}
          >
            <View className='service-icon'>✨</View>
            <View className='service-name'>半永久纹绣</View>
            <View className='service-desc'>眉眼唇纹绣</View>
          </View>
          
          <View 
            className='service-item'
            onClick={() => Taro.navigateTo({ url: '/pages/services/category/index?category=eyelash' })}
          >
            <View className='service-icon'>👁️</View>
            <View className='service-name'>精致美睫</View>
            <View className='service-desc'>睫毛嫁接美化</View>
          </View>
        </View>
      </View>

      {/* 作品推荐瀑布流 */}
      <View className='portfolio-section'>
        <View className='section-header'>
          <View className='section-title'>精选作品</View>
          <View 
            className='section-more'
            onClick={() => Taro.navigateTo({ url: '/pages/portfolio/index' })}
          >
            查看更多 →
          </View>
        </View>
        
        {portfolioLoading ? (
          <View className='portfolio-loading'>
            <View className='loading-grid'>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} className='loading-item'>
                  <View className='loading-image'></View>
                  <View className='loading-text'></View>
                  <View className='loading-text short'></View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <PortfolioGrid
            portfolios={portfolios}
            waterfall
            columns={2}
            onItemClick={handlePortfolioClick}
            className='home-portfolio-grid'
          />
        )}
      </View>

      {/* 明星化妆师展示 */}
      <View className='artists-section'>
        <View className='section-header'>
          <View className='section-title'>明星化妆师</View>
          <View 
            className='section-more'
            onClick={() => Taro.navigateTo({ url: '/pages/artists/index' })}
          >
            查看更多 →
          </View>
        </View>
        
        {artistLoading ? (
          <View className='artists-loading'>
            <ScrollView scrollX className='loading-scroll'>
              {Array.from({ length: 3 }).map((_, index) => (
                <View key={index} className='loading-artist-card'>
                  <View className='loading-avatar'></View>
                  <View className='loading-info'>
                    <View className='loading-text'></View>
                    <View className='loading-text short'></View>
                    <View className='loading-text'></View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <ScrollView scrollX className='artists-scroll'>
            <View className='artists-list'>
              {artists.map((artist) => (
                <View key={artist.id} className='artist-item'>
                  <ArtistCard
                    artist={artist}
                    mode='compact'
                    onClick={handleArtistClick}
                    showSelectButton={false}
                    className='home-artist-card'
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* 优惠活动 */}
      <View className='promotions-section'>
        <View className='section-title'>优惠活动</View>
        <View className='promotions-grid'>
          <View 
            className='promotion-item'
            onClick={() => Taro.navigateTo({ url: '/pages/profile/coupons/index' })}
          >
            <View className='promotion-icon'>🎁</View>
            <View className='promotion-content'>
              <View className='promotion-title'>新人专享</View>
              <View className='promotion-desc'>注册即送100元优惠券</View>
            </View>
          </View>
          
          <View 
            className='promotion-item'
            onClick={() => Taro.navigateTo({ url: '/pages/services/index' })}
          >
            <View className='promotion-icon'>💰</View>
            <View className='promotion-content'>
              <View className='promotion-title'>满减优惠</View>
              <View className='promotion-desc'>满500减50，满1000减120</View>
            </View>
          </View>
        </View>
      </View>

      {/* 门店信息 */}
      <View className='store-section'>
        <View className='section-title'>门店信息</View>
        <View className='store-card'>
          <View className='store-header'>
            <View className='store-name'>美丽化妆工作室</View>
            <View className='store-status'>营业中</View>
          </View>
          
          <View className='store-info'>
            <View className='info-item'>
              <View className='info-icon'>📍</View>
              <View className='info-content'>
                <View className='info-label'>地址</View>
                <View className='info-text'>北京市朝阳区三里屯太古里南区123号</View>
              </View>
              <View 
                className='info-action'
                onClick={() => {
                  // 调用微信地图导航
                  console.log('导航到门店')
                }}
              >
                导航
              </View>
            </View>
            
            <View className='info-item'>
              <View className='info-icon'>🕐</View>
              <View className='info-content'>
                <View className='info-label'>营业时间</View>
                <View className='info-text'>周一至周日 09:00-21:00</View>
              </View>
            </View>
            
            <View className='info-item'>
              <View className='info-icon'>📞</View>
              <View className='info-content'>
                <View className='info-label'>联系电话</View>
                <View className='info-text'>400-123-4567</View>
              </View>
              <View 
                className='info-action'
                onClick={() => {
                  // 调用微信拨打电话
                  console.log('拨打电话')
                }}
              >
                拨打
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 底部间距 */}
      <View className='bottom-spacing'></View>
    </View>
  )
}