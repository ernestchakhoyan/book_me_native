import * as React from "react";
import {
    Icon,
    ListItem,
    Text
} from "react-native-elements";
import {
    StyleSheet,
    View
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import config from "../../constants/config";
import { DropdownPicker } from "../../components";
import { column_view } from "../../styles/common";
import { metrics } from "../../styles/vars";

function CustomDrawer(props) {
    const { navigation } = props;
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <ListItem containerStyle={styles.lng_container} bottomDivider>
                        <Text style={{ fontSize: 13 }}>Language</Text>
                        <DropdownPicker />
                    </ListItem>
                </View>
                <View>
                    {
                        config.drawer_navigators.map((item, i) => (
                            <ListItem key={i} onPress={() => navigation.navigate(item.navigation)}>
                                <Icon bra name={item.icon} />
                                <ListItem.Content>
                                    <Text>{item.title}</Text>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </View>
                <View>
                    <ListItem containerStyle={styles.lng_container} bottomDivider>
                        <Text style={{ fontSize: 13 }}>Preference</Text>
                        <View style={{ backgroundColor: "red", height: 20, width: 30 }} />
                    </ListItem>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    lng_container: {
        ...column_view
    }
});

export default CustomDrawer;