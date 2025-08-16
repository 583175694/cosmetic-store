import { View } from '@tarojs/components'
import './index.scss'

export default function Profile() {
  return (
    <View className='profile-page'>
      <View className='container'>
        <View className='text-center mt-xl'>
          <View className='text-2xl font-bold text-primary'>个人中心</View>
          <View className='text-base text-secondary mt-sm'>我的信息</View>
        </View>
      </View>
    </View>
  )
}