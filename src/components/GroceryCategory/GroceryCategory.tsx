import { currencyFormatter } from '@utils/formatter'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { styles } from './styles'
import { THEME } from '@theme/index'

export type GroceryCategoryStatus = 'normal' | 'filled' | 'skipped'

interface GroceryCategoryProps {
  data: {
    id: number
    description: string
    amountOfProducts: number
    totalPrice: number
    status: GroceryCategoryStatus
  }
}

const containerStyle = {
  normal: styles.container,
  filled: styles.containerFilled,
  skipped: styles.containerSkipped,
}

export function GroceryCategory({ data }: GroceryCategoryProps) {
  return (
    <TouchableOpacity
      className={'space-y-3 rounded-md px-4 py-3'}
      style={containerStyle[data.status]}
    >
      <View className="flex-1 flex-row justify-between">
        <View>
          <Text
            style={[
              data.status === 'filled' ? styles.textLight : styles.textDark,
              styles.title,
            ]}
          >
            {data.description}
          </Text>
          <Text
            style={[
              data.status === 'filled' ? styles.textLight : styles.textDark,
              styles.subtitle,
            ]}
          >
            {data.amountOfProducts > 0
              ? `${data.amountOfProducts} itens selecionados`
              : 'Nenhum item selecionado'}
          </Text>
        </View>

        {data.status === 'filled' ? (
          <Feather name="check" size={24} color={THEME.COLORS.GREY_100} />
        ) : null}
      </View>

      <View className="flex-row items-center justify-between">
        <Text
          style={[
            data.status === 'filled' ? styles.textLight : styles.textDark,
            styles.totalPrice,
          ]}
        >
          R$ {currencyFormatter(data.totalPrice)}
        </Text>
        <Feather
          name="chevron-right"
          size={24}
          color={
            data.status === 'filled'
              ? THEME.COLORS.GREY_100
              : THEME.COLORS.GREY_900
          }
        />
      </View>
    </TouchableOpacity>
  )
}
