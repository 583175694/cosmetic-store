import React, { ReactNode } from 'react'
import { View } from '@tarojs/components'
import { Tabbar } from '@taroify/core'
import { HomeOutlined, AppsOutlined, PhotoOutlined, UserOutlined } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

interface TabLayoutProps {
  /** 页面内容 */
  children: ReactNode
  /** 当前激活的tab */
  activeTab?: string
  /** 自定义类名 */
  className?: string
}

const TabLayout: React.FC<TabLayoutProps> = ({
  children,
  activeTab,
  className = ''
}) => {
  const handleTabChange = (path: string) => {
    if (path !== activeTab) {
      Taro.switchTab({ url: path })
    }
  }

  const tabItems = [
    {
      key: '/pages/home/index',
      text: '首页',
      icon: <HomeOutlined />
    },
    {
      key: '/pages/services/index',
      text: '服务',
      icon: <AppsOutlined />
    },
    {
      key: '/pages/portfolio/index',
      text: '作品',
      icon: <PhotoOutlined />
    },
    {
      key: '/pages/profile/index',
      text: '我的',
      icon: <UserOutlined />
    }
  ]

  return (
    <View className={`tab-layout ${className}`}>
      <View className="tab-layout__content">
        {children}
      </View>
      
      <Tabbar 
        className="tab-layout__tabbar"
        value={activeTab}
        onChange={handleTabChange}
      >
        {tabItems.map(item => (
          <Tabbar.TabbarItem 
            key={item.key}
            value={item.key}
            icon={item.icon}
          >
            {item.text}
          </Tabbar.TabbarItem>
        ))}
      </Tabbar>
    </View>
  )
}

export default TabLayout