
import * as React from 'react';
//import { Button, View, Text } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';

//import { createDrawerNavigator } from '@react-navigation/drawer';
import RootStackScreen from 'screens/RootStackScreen'


 
//const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootStackScreen/>
      {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
