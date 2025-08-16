import { View } from '@tarojs/components'
import './index.scss'
import { Button } from "@taroify/core"

export default function Index () {
  return (
    <View className='index'>
      <Button>Hello world!!!?</Button>
      <Button color="primary">主要按钮</Button>
    </View>
  )
}
