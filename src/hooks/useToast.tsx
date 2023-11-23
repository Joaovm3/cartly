import { Notifier } from 'react-native-notifier'

interface ToastProps {
  title: string
  description?: string
  onPress?: () => void
  type?: 'danger' | 'success'
}

export function useToast() {
  const showNotification = ({
    title,
    description,
    type = 'success',
    onPress,
  }: ToastProps) => {
    const TITLE_COLOR = 'white'
    const DESCRIPTION_COLOR = TITLE_COLOR
    const BACKGROUND_COLOR = type === 'success' ? '#4CB944' : '#DB2B39'

    const closeAndExecuteOnPress = () => {
      if (onPress) onPress()

      Notifier.hideNotification()
    }

    return Notifier.showNotification({
      title,
      description,
      duration: 5000,
      showAnimationDuration: 800,
      onPress: closeAndExecuteOnPress,
      hideOnPress: false,
      componentProps: {
        containerStyle: {
          marginTop: 25,
          backgroundColor: BACKGROUND_COLOR,
        },
        titleStyle: {
          color: TITLE_COLOR,
        },
        descriptionStyle: {
          color: DESCRIPTION_COLOR,
        },
      },
    })
  }

  return { showNotification }
}
