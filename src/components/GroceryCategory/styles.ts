import { StyleSheet } from 'react-native'
import { THEME } from '@theme/index'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.GREY_200
  },
  containerFilled: {
    backgroundColor: THEME.COLORS.BRAND_MID
  },
  containerSkipped: {
    backgroundColor: THEME.COLORS.GREY_200,
    opacity: 0.6
  },

  title: {
    fontSize: 16,
    lineHeight: 16 * 1.6,
    fontWeight: "600"
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 14 * 1.6,
    fontWeight: "400"
  },

  totalPrice: {
    fontSize: 18,
    lineHeight: 18 * 1.6,
    fontWeight: "600"
  },

  textLight: {
    color: THEME.COLORS.GREY_100
  },
  textDark: {
    color: THEME.COLORS.GREY_900
  },
})