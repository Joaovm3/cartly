import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import { Categories } from '@screens/Categories'
import { Category, CategoryRouteParams } from '@screens/Category'
import { Product, ProductRouteParams } from '@screens/Product'

export type CategoriesRoutes = {
  categoriesList: undefined
  category: CategoryRouteParams
  product: ProductRouteParams
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
    >
      <CategoriesStack.Screen name="categoriesList" component={Categories} />
      <CategoriesStack.Screen name="category" component={Category} />
      <CategoriesStack.Screen name="product" component={Product} />
    </CategoriesStack.Navigator>
  )
}
