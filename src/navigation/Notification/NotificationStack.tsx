import { createStackNavigator } from '@react-navigation/stack'
import { Notification } from '@screens/Notification'

const NotificationStack = createStackNavigator()

export function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerTitle: '',
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <NotificationStack.Screen name="notification" component={Notification} />
      {/* ... outras screens relacionadas as notificações... */}
    </NotificationStack.Navigator>
  )
}
