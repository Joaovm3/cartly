import { Text } from 'react-native'

interface HeadingProps {
  children: React.ReactNode
}

export function Heading({ children }: HeadingProps) {
  return (
    <Text className="text-base font-medium leading-relaxed text-gray-900">
      {children}
    </Text>
  )
}
