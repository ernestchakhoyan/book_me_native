import * as React from "react";
import { useState } from "react";
import {
    Icon,
    ListItem,
    withTheme
} from "react-native-elements";
import {
    StyleSheet,
    View
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import {
    DropdownPicker,
    Switcher,
    Text
} from "../../components";
import config from "../../constants/config";

import { column_view } from "../../styles/common";
import { metrics } from "../../styles/vars";
import dark from "../../theme/dark";
import light from "../../theme/light";
import ScreenWrapper from "../ScreenWrapper";

function CustomDrawer(props) {
    const { t } = useTranslation();
    const { navigation, updateTheme, theme } = props;
    const [ isEnabled, setIsEnabled ] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => {
            enableDarkMode(!previousState);
            return !previousState;
        });
    };

    const enableDarkMode = (isDarkMode) => {
        if (isDarkMode) {
            updateTheme(dark);
        } else {
            updateTheme(light);
        }
    };

    return (
            <ScreenWrapper customStyles={{padding: 0}}>
                <DrawerContentScrollView {...props} style={styles.drawerContent}>
                    <View>
                        <ListItem containerStyle={styles.list_container} bottomDivider>
                            <Text style={styles.list_label}>{t("language")}</Text>
                            <DropdownPicker />
                        </ListItem>
                    </View>
                    <View>
                        {
                            config.drawer_navigators.map((item, i) => (
                                <ListItem
                                    key={i}
                                    onPress={() => navigation.navigate(item.navigation)}
                                    containerStyle={styles.list_item}
                                >
                                    <Icon name={item.icon} color={theme.colors.secondary}/>
                                    <ListItem.Content>
                                        <Text>{item.title}</Text>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </View>
                    <View>
                        <ListItem containerStyle={styles.list_container} topDivider>
                            <Text style={styles.list_label}>{t(`${isEnabled ? "light" : "dark"} mode`)}</Text>
                            <Switcher isEnabled={isEnabled} callback={toggleSwitch} />
                        </ListItem>
                    </View>
                </DrawerContentScrollView>
            </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        width: "100%",
        flex: 1
    },
    list_container: {
        ...column_view,
        backgroundColor: "rgba(0,0,0,0)"
    },
    list_item: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    list_label: {
        fontSize: 13,
        marginBottom: metrics.spacing
    }
});

export default withTheme(CustomDrawer);