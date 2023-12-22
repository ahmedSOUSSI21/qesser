import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Auth from './screens/Auth';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './core/firebaseConfig';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser(user)
    }
    )
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={screenOptions}>
        {user ?
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
          :
          <>
            <Stack.Screen name="Auth" component={Auth} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
