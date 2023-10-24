import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import { Categories } from '@screens/Categories'
import { Category, CategoryRouteParams } from '@screens/Category'
import { Product } from '@screens/Product'

export type CategoriesRoutes = {
  categories: undefined
  category: CategoryRouteParams
  product: undefined
}

export type CategoriesStackNavigatorProps =
  StackNavigationProp<CategoriesRoutes>

const CategoriesStack = createStackNavigator<CategoriesRoutes>()

export function CategoriesStackRoutes() {
  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="product"
    >
      <CategoriesStack.Screen name="categories" component={Categories} />
      <CategoriesStack.Screen name="category" component={Category} />
      <CategoriesStack.Screen name="product" component={Product} />
    </CategoriesStack.Navigator>
  )
}
