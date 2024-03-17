import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login'
import Homepage from './Screens/Homepage';
import Registration from './Screens/Registration';
import Details from './Screens/Details';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator >
         <Stack.Screen name="Registration" component={Registration}  options={{headerShown:false}} /> 
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} /> 
        <Stack.Screen name="Homepage" component={Homepage} options={{headerShown:false}} />
         <Stack.Screen name="Details" component={Details} options={{headerShown:false}} /> 
         
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

