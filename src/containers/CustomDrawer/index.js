import * as React from "react";
import {
    Icon,
    ListItem,
    Text
} from "react-native-elements";
import { View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import config from "../../constants/config";


function CustomDrawer(props) {
    const {navigation} = props;
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <ListItem bottomDivider>
                        <Text style={{fontSize:  13}}>Language</Text>
                        <View style={{backgroundColor: "red", height: 20, width: 30}}/>
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
                    <ListItem bottomDivider>
                        <Text style={{fontSize:  13}}>Preference</Text>
                        <View style={{backgroundColor: "red", height: 20, width: 30}}/>
                    </ListItem>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;