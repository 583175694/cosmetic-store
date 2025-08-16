import { View } from '@tarojs/components'
import './index.scss'

export default function Portfolio() {
  return (
    <View className='portfolio-page'>
      <View className='container'>
        <View className='text-center mt-xl'>
          <View className='text-2xl font-bold text-primary'>作品展示</View>
          <View className='text-base text-secondary mt-sm'>精美化妆作品</View>
        </View>
      </View>
    </View>
  )
}