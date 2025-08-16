import { View } from '@tarojs/components'
import './index.scss'

export default function Services() {
  return (
    <View className='services-page'>
      <View className='container'>
        <View className='text-center mt-xl'>
          <View className='text-2xl font-bold text-primary'>服务中心</View>
          <View className='text-base text-secondary mt-sm'>专业化妆服务</View>
        </View>
      </View>
    </View>
  )
}