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
import {
    BottomSheet,
    CustomDrawer
} from "../containers";
import {
    Icon,
    withTheme
} from "react-native-elements";

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
            <Stack.Screen
                name="Seats"
                component={Seats}
                options={{ headerShown: true }}
            />
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

function HomeScreen({ toggleBottomSheet, theme }) {
    //TODO: Is Authorized and admin show tab bar
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.primary,
                inactiveTintColor: theme.colors.text,
                style: {
                    backgroundColor: theme.colors.bottomBar
                }
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon type="font-awesome" name="home" color={color} size={size} />
                    ),
                }}
            >
                {() => HomeStack(toggleBottomSheet)}
            </Tab.Screen>
            <Tab.Screen
                name="Reserves"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon type="font-awesome" name="bookmark" color={color} size={size} />
                    ),
                }}
            >
                {() => ReservesStack(toggleBottomSheet)}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

function AppNavigator(props) {
    const {theme}  = props;
    const [ visible, setVisible ] = React.useState(false);

    const toggleBottomSheet = () => {
        setVisible(!visible);
    };

    return (
        <View style={{ display: "flex", flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen
                        name="Home_"
                    >
                        {() => HomeScreen({ toggleBottomSheet, theme })}
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

export default withTheme(AppNavigator);