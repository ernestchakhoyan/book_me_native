import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    About,
    Home,
    Privacy,
    Reservation,
    Reserves,
    Seats
} from "../screens";
import { AppHeader } from "../components";
import { BottomSheet } from "../containers";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(toggleBottomSheet) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: true,
                    header: (props) => <AppHeader {...props} toggleBottomSheet={toggleBottomSheet} />
                }}
            />
            <Stack.Screen
                name="Reservation"
                component={Reservation}
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen name="Seats" component={Seats} options={{ headerShown: true }}/>
        </Stack.Navigator>
    );
}

function ReservesStack(toggleBottomSheet) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Reserves"
                component={Reserves}
                options={{
                    headerShown: true,
                    header: (props) => <AppHeader {...props} toggleBottomSheet={toggleBottomSheet} />
                }}
            />
        </Stack.Navigator>
    );
}

function HomeScreen({toggleBottomSheet}) {
    //TODO: Is Authorized and admin show tab bar
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
            >
                {() => HomeStack(toggleBottomSheet)}
            </Tab.Screen>
            <Tab.Screen
                name="Reserves"
            >
                {() => ReservesStack(toggleBottomSheet)}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const [ visible, setVisible ] = React.useState(false);

    const toggleBottomSheet = () => {
        setVisible(!visible);
    };

    return (
        <View style={{ display: "flex", flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen
                        name="Home"
                    >
                        {() => HomeScreen({toggleBottomSheet})}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name="About"
                        component={About}
                        options={{
                            headerShown: true,
                            header: (props) => <AppHeader {...props} toggleBottomSheet={toggleBottomSheet} />
                        }} />
                    <Drawer.Screen
                        name="Privacy"
                        component={Privacy}
                        options={{
                            headerShown: true,
                            header: (props) => <AppHeader {...props} toggleBottomSheet={toggleBottomSheet} />
                        }} />
                </Drawer.Navigator>
            </NavigationContainer>
            <BottomSheet visible={visible} toggleCallback={toggleBottomSheet} />
        </View>
    );
}

export default AppNavigator;