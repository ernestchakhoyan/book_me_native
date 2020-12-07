import React from "react";
import {StyleSheet} from "react-native";
import {
    Icon,
    ListItem,
    withTheme
} from "react-native-elements";
import Menu from "react-native-material-menu";
import { useTranslation } from "react-i18next";

import config from "../../constants/config";
import Text from "../Text";
import Switcher from "../Switcher";

function ReserveActions({ theme, status, statusCallback, deleteCallback }) {
    const [ menu, setMenu ] = React.useState(null);
    const [ statusToggle, setStatusToggle ] = React.useState(!!status);
    const { t } = useTranslation();

    const setMenuRef = ref => {
        setMenu(ref);
    };

    const hideMenu = () => {
        menu.hide();
    };

    const showMenu = () => {
        menu.show();
    };

    const toggleSwitch = () => {
        setStatusToggle(previousState => {
            statusCallback();
            hideMenu();
            return !previousState;
        });
    };

    return (
        <Menu
            ref={setMenuRef}
            button={
                <Icon
                    onPress={showMenu}
                    name="ellipsis-v"
                    type="font-awesome"
                    color={theme.colors.text}
                />
            }
            style={{ backgroundColor: theme.colors.menu_bg }}
        >
            {config.reserve_actions.map((item) => {
                return (
                    <ListItem
                        key={item.name}
                        containerStyle={{ ...styles.list_item, backgroundColor: theme.colors.menu_bg }}
                        onPress={() => {
                            item.name !== "status" ? deleteCallback() : null;
                        }}
                    >
                        <Text>
                            {item.name !== "status" ? t(item.name) : (status ? t("busy") : t("free"))}
                        </Text>
                        {item.name !== "status" ? (
                            <Icon
                                type="font-awesome"
                                name={item.icon}
                                color={theme.colors.error}
                            />
                        ) : (
                            <Switcher isEnabled={statusToggle} callback={toggleSwitch} />
                        )}
                    </ListItem>
                );
            })}
        </Menu>
    );
}

const styles = StyleSheet.create({
    list_item: {
        alignItems: "center"
    }
});

export default withTheme(ReserveActions);