import { Text } from 'react-native'

interface PageTitleProps {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <Text className="text-2xl font-medium leading-relaxed">{title}</Text>
}
