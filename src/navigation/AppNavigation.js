import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <View>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Hello" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default AppNavigator;