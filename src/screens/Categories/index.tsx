import React from 'react'
import { ScrollView, View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AppStackNavigatorProps } from '@routes/app.stack.routes'
import { CategoryCard } from '@components/CategoryCard'
import { useFetchCategories } from '@hooks/useFetchCategories'
import { Loading } from '@components/Loading'

export function Categories() {
  const { categories, isCategoriesLoading } = useFetchCategories()

  const navigation = useNavigation<AppStackNavigatorProps>()

  function handleGoToCategory(id: number) {
    console.log(id)
    navigation.canGoBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-6">
        <Text className="pt-2 text-2xl font-medium leading-relaxed">
          Categorias
        </Text>

        <View className="mt-5 flex-1 pb-52">
          {isCategoriesLoading ? (
            <View className="flex-1 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <CategoryCard
                  categoryId={item.id}
                  title={item.description}
                  icon={item.icon}
                  onCategoryPress={handleGoToCategory}
                />
              )}
              numColumns={2}
              columnWrapperStyle={{
                gap: 24,
              }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View className="mb-3 mt-3" />}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
