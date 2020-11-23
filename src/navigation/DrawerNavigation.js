import {
    About,
    Home,
    Privacy
} from "../screens";
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();


function DrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Privacy" component={Privacy} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;