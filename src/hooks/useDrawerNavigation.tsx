import { ParamListBase, useNavigation } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

let navigation: DrawerNavigationProp<ParamListBase>

function openDrawer() {
  return navigation.openDrawer()
}

export function useDrawerNavigation() {
  navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  return { navigation, openDrawer }
}
