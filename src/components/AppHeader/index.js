import React from "react";
import {
    StyleSheet
} from "react-native";
import { Header } from "react-native-elements";
import UserAvatar from "../UserAvatar";

function AppHeader(props) {
    const { toggleBottomSheet, scene } = props;
    const { route, descriptor } = scene;
    const { navigation } = descriptor;

    const handleDrawerToggle = () => {
        navigation.toggleDrawer();
    };

    const RightComponent = () => {
        return (
            <UserAvatar
                size="small"
                rounded
                title="EC"
                onPress={toggleBottomSheet}
                containerStyle={{backgroundColor: "#000"}}
            />
        );
    };

    return (
        <Header
            placement="left"
            leftComponent={{ icon: "menu", color: "#fff", onPress: handleDrawerToggle }}
            centerComponent={{ text: route.name, style: { color: "#fff" } }}
            rightComponent={<RightComponent/>}
        />
    );
}

const styles = StyleSheet.create({});

export default AppHeader;