import * as React from "react";
import {
    ActivityIndicator,
    View
} from "react-native";
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
    CustomDrawer,
    ScreenWrapper,
    WelcomePage
} from "../containers";
import {
    Icon,
    withTheme
} from "react-native-elements";
import Login from "../screens/Login";
import { getItemFromStorage } from "../services/storage";
import { Context as AuthContext } from "../context/AuthContext";
import { centered_screen } from "../styles/common";
import Text from "../components/Text";
import { signout } from "../actions/Authorization";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: true,
                    header: (props) => <AppHeader {...props} />
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

function ReservesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Reserves"
                component={Reserves}
                options={{
                    headerShown: true,
                    header: (props) => <AppHeader {...props} />
                }}
            />
        </Stack.Navigator>
    );
}

function HomeScreen({ theme }) {
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
                {() => HomeStack()}
            </Tab.Screen>
            <Tab.Screen
                name="Reserves"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon type="font-awesome" name="bookmark" color={color} size={size} />
                    ),
                }}
            >
                {() => ReservesStack()}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const InitialStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomePage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    );
};

function AppNavigator(props) {
    const { state: { token, authorizationLoading }, signin, signout } = React.useContext(AuthContext);
    const { theme } = props;

    React.useEffect(() => {
        setTimeout(async () => {
            try {
                const token = await getItemFromStorage("access_token");
                if (token) {
                    signin(token);
                }else{
                    signout()
                }
            } catch (e) {
                console.log(e);
                signout();
            }
        }, 1000);
    }, []);

    if (authorizationLoading) {
        return (
            <ScreenWrapper customStyles={centered_screen}>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                />
            </ScreenWrapper>
        );
    }

    return (
        <View style={{ display: "flex", flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => <CustomDrawer {...props} />}
                >
                    {!token && (
                        <Drawer.Screen
                            name="Initial_"
                            component={InitialStack}
                        />
                    )}
                    <Drawer.Screen
                        name="Home_"
                    >
                        {() => token ? HomeScreen({ theme }) : HomeStack()}
                    </Drawer.Screen>
                    <Drawer.Screen
                        name="About"
                        component={About}
                        options={{
                            headerShown: true,
                            header: (props) => <AppHeader {...props} />
                        }} />
                    <Drawer.Screen
                        name="Privacy"
                        component={Privacy}
                        options={{
                            headerShown: true,
                            header: (props) => <AppHeader {...props} />
                        }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default withTheme(AppNavigator);