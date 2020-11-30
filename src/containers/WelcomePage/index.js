import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {
    Icon,
    withTheme
} from "react-native-elements";

import { Text } from "../../components";
import ScreenWrapper from "../ScreenWrapper";

import { metrics } from "../../styles/vars";
import colors from "../../theme/colors";

import { isAuthorized } from "../../utils/authorization";

import {
    box_shadow,
    centered_screen
} from "../../styles/common";

const item_border_radius = 10;

function WelcomePage({ navigation,  theme }) {

    const checkAuthorization = async () => {
        const authorized = await isAuthorized();
        if (authorized) {
            navigation.navigate("Home_");
        }
    };

    React.useEffect(() => {
        checkAuthorization().then(r => r);
    }, []);

    return (
        <ScreenWrapper customStyles={{...styles.container}}>
            <View style={styles.header}>
                <Text h1 style={{ color: theme.colors.primary }}>
                    Welcome to
                </Text>
                <Text h3 style={{ color: theme.colors.primary }}>
                    book.me
                </Text>
            </View>

            <View style={{padding: metrics.spacing_lg()}}>
                <Text style={styles.item_label}>Enter as:</Text>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={{
                            ...styles.item,
                            backgroundColor: theme.colors.secondary,
                            marginRight: metrics.spacing_lg()
                        }}
                        onPress={() => navigation.navigate("Home_")}
                    >
                        <Icon type="font-awesome"  size={50} name="user-secret" color={theme.colors.primary}/>
                        <Text style={{...styles.item_text, color: theme.colors.primary}}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.item,  backgroundColor: theme.colors.secondary }}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Icon type="font-awesome" size={50} name="user" color={theme.colors.primary}/>
                        <Text style={{ ...styles.item_text, color: theme.colors.primary}}>Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...centered_screen
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    item: {
        ...centered_screen,
        ...box_shadow,
        padding: metrics.spacing_lg(),
        borderColor: colors.secondary,
        borderWidth: 1,
        borderTopLeftRadius: item_border_radius,
        borderTopRightRadius: item_border_radius,
        borderBottomRightRadius: item_border_radius,
        borderBottomLeftRadius: item_border_radius,
    },
    item_label: {
        marginBottom: metrics.spacing,
        fontSize: 16
    },
    item_text: {
        marginTop: metrics.spacing
    },
});

export default withTheme(WelcomePage);