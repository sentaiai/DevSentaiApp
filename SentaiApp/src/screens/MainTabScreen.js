import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();



function MainTabScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{ backgroundColor: '#e6642e' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#e6642e',
            tabBarIcon: ({ color }) => (
              <MIcon name="home-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#e6642e',
            tabBarIcon: ({ color }) => (
              <MIcon name="account-outline" color={color} size={26} />
            ),
          }}
        />
        
        
      </Tab.Navigator>
    );
  }

  export default MainTabScreen;

function HomeStackScreen({navigation}) {
    return (
      <HomeStack.Navigator initialRouteName="Home" screenOptions ={{
        headerStyle : {
          backgroundColor: '#e6642e',
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight:"normal",        
        },
        headerTitleAlign:"center"
      }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          title:'Overview',
          headerLeft : () => (
            <Icon.Button name = "ios-menu" size={25}
            backgroundColor = "#e6642e" onPress={() => navigation.openDrawer() }>
            </Icon.Button>
        )
      }} 
        />
      </HomeStack.Navigator> 
    );
  }
  
  function ProfileStackScreen({navigation}) {
    return (
      <ProfileStack.Navigator  screenOptions ={{
        headerStyle : {
          backgroundColor: '#e6642e',
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight:"normal",        
        },
        headerTitleAlign:"center"
      }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
          title:'Profile',
          headerLeft : () => (
            <Icon.Button name = "ios-menu" size={25}
            backgroundColor = "#e6642e" onPress={() => navigation.openDrawer() }>
            </Icon.Button>
        )
      }}
      />
      </ProfileStack.Navigator> 
    );
  }

  