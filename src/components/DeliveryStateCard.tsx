import React from 'react'
import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { OrderStatus } from '@utils/order-status.enum'

const STATUS_PERCENT = {
  [OrderStatus.FAILED]: '0%',
  [OrderStatus.PENDING]: '50%',
  [OrderStatus.PROCESSED]: '80%',
  [OrderStatus.COMPLETED]: '100%',
}

const STATUS_ICON = {
  [OrderStatus.FAILED]: 'alert-triangle',
  [OrderStatus.PENDING]: 'shopping-bag',
  [OrderStatus.PROCESSED]: 'truck',
  [OrderStatus.COMPLETED]: 'user-check',
}

export interface DeliveryCardProps {
  id: string
  status: OrderStatus
  estimatedDelivery: string
  title: string
  subtitle: string
}

export function DeliveryStateCard(props: DeliveryCardProps) {
  const percentage = STATUS_PERCENT[props.status] || ('0%' as any)
  const icon = STATUS_ICON[props.status] || 'archive'

  return (
    <View className="w-[350] space-y-4 rounded-md bg-gray-200 p-4">
      <View className="flex-row items-center gap-4">
        <Feather name={icon} size={28} color="#4CB944" />
        <View>
          <Text className="text-base font-semibold leading-relaxed text-green-500">
            {props.title} - {props.id}
          </Text>
          <Text className="text-sm leading-4 text-gray-600">
            {props.subtitle}
          </Text>
        </View>
      </View>

      <View className="relative h-2 w-full rounded-full bg-white">
        <View
          className="relative h-2 rounded-full bg-green-500"
          style={{ width: percentage }}
        >
          <View className="absolute -left-2 -top-1 h-4 w-4 rounded-full bg-green-500"></View>
          <View className="absolute -right-2 -top-1 h-4 w-4 rounded-full bg-green-500"></View>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-sm leading-4 text-gray-600">
          Entrega estimada
        </Text>
        <Text className="text-xl font-bold leading-relaxed text-green-500">
          {props.estimatedDelivery}
        </Text>
      </View>
    </View>
  )
}
