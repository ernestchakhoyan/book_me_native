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

import { DropdownPicker, Switcher, Text } from "../../components";
import config from "../../constants/config";

import { column_view } from "../../styles/common";
import { metrics } from "../../styles/vars";
import dark from "../../theme/dark";
import light from "../../theme/light";


function CustomDrawer(props) {
    const {t} = useTranslation();
    const { navigation, updateTheme } = props;
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
        <View style={{ flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <ListItem containerStyle={styles.list_container} bottomDivider>
                        <Text style={styles.list_label}>{t("language")}</Text>
                        <DropdownPicker />
                    </ListItem>
                </View>
                <View>
                    {
                        config.drawer_navigators.map((item, i) => (
                            <ListItem key={i} onPress={() => navigation.navigate(item.navigation)}>
                                <Icon name={item.icon} />
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
                        <Text style={styles.list_label}>{t(`${isEnabled? "light" : "dark"} mode`)}</Text>
                        <Switcher isEnabled={isEnabled} callback={toggleSwitch} />
                    </ListItem>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    list_container: {
        ...column_view
    },
    list_label: {
        fontSize: 13,
        marginBottom: metrics.spacing
    }
});

export default withTheme(CustomDrawer);