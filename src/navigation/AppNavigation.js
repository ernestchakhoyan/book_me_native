import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    About,
    Home,
    Privacy,
    Reserves,
    Reservation,
    Seats
} from "../screens";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Reservation" component={Reservation}/>
            <Stack.Screen name="Seats" component={Seats}/>
        </Stack.Navigator>
    )
}

function HomeScreen() {
    //TODO: Is Authorized and admin show tab bar
    return (
       <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Reserves" component={Reserves}/>
       </Tab.Navigator>
    );
}


function AppNavigator() {
    return (
        <View style={{display: "flex", flex:1}}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="About" component={About} />
                    <Drawer.Screen name="Privacy" component={Privacy} />
                </Drawer.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default AppNavigator;