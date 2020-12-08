import React from "react";
import { StyleSheet } from "react-native";
import {
    withTheme
} from "react-native-elements";
import Menu, { MenuItem } from "react-native-material-menu";
import { Flag } from "react-native-svg-flagkit";
import { useTranslation } from "react-i18next";

import Text from "../Text";
import config from "../../constants/config";
import { centered } from "../../styles/common";

function DropdownPicker({theme}) {
    const [ menu, setMenu ] = React.useState(null);
    const [activeLng,setActiveLng] =  React.useState("US");
    const { i18n, t } = useTranslation();

    const setMenuRef = ref => {
        setMenu(ref);
    };

    const hideMenu = () => {
        menu.hide();
    };

    const showMenu = () => {
        menu.show();
    };

    const handleLngChange = (code) => {
        setActiveLng(code);
        hideMenu();
        return i18n.changeLanguage(code.toLowerCase());
    }


    return (
        <Menu
            ref={setMenuRef}
            button={
                <Flag
                    onPress={showMenu}
                    id={activeLng}
                    size={0.2}
                    height={120}
                    width={150}
                />
            }
            style={{ backgroundColor: theme.colors.menu_bg }}
        >
            {config.languages.map((item) => {
                return (
                    <MenuItem
                        onPress={() => handleLngChange(item.code)}
                        key={item.code}
                        style={{ ...styles.menuItem, backgroundColor: theme.colors.menu_bg }}
                    >
                        <Flag
                            id={item.code}
                            size={0.2}
                            height={80}
                        />
                        <Text>{t(item.name)}</Text>
                    </MenuItem>
                )
            })}
        </Menu>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        ...centered,
    }
});

export default withTheme(DropdownPicker);