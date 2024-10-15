import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { useAuthStore } from '@state/authStore'

const ProductDashboard: FC = () => {
    const { user } = useAuthStore()
    console.log("user" , user)
  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  )
}

export default ProductDashboard