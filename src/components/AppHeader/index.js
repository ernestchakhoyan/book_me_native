import React from "react";
import {
    StyleSheet
} from "react-native";
import { Header } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";

import UserAvatar from "../UserAvatar";
import BottomSheet from "../BottomSheet";

function AppHeader(props) {
    const { state: { token} } = React.useContext(AuthContext);
    const [ visible, setVisible ] = React.useState(false);
    const { scene } = props;
    const { route, descriptor } = scene;
    const { navigation } = descriptor;

    const handleDrawerToggle = () => {
        navigation.toggleDrawer();
    };

    const toggleBottomSheet = () => {
        setVisible(!visible);
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
        <>
            <Header
                placement="left"
                leftComponent={{ icon: "menu", color: "#fff", onPress: handleDrawerToggle }}
                centerComponent={{ text: route.name, style: { color: "#fff" } }}
                rightComponent={token ? <RightComponent/> : null}
            />
            <BottomSheet
                visible={visible}
                toggleCallback={toggleBottomSheet}
                navigation={navigation}
            />
        </>
    );
}

const styles = StyleSheet.create({});

export default AppHeader;