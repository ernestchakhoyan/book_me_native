import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { BottomSheet } from "react-native-btr";
import {
    Icon,
    withTheme
} from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";

import { Text,UserAvatar } from "../../components";
import ScreenWrapper from "../ScreenWrapper";

import { metrics } from "../../styles/vars";
import colors from "../../theme/colors";

const sheetHeight = 250;
const sheetBorderRadius = 40;

const Bar = () => {
    return (
        <View
            style={styles.bar}
        />
    )
}

function Sheet(props) {
    const { signout } = React.useContext(AuthContext);
    const { visible, toggleCallback, theme, navigation } = props;

    const handleLogout = async () => {
        await signout();
        navigation.navigate("Initial_");
        toggleCallback();
    }

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={toggleCallback}
            onBackdropPress={toggleCallback}
        >

            <ScreenWrapper customStyles={styles.wrapper}>
                <Bar />
                <View style={styles.header}>
                        <UserAvatar
                            size="small"
                            rounded
                            title="EC"
                            containerStyle={{backgroundColor: theme.colors.primary,  marginRight: metrics.spacing_md()}}
                            titleStyle={{color: theme.colors.secondary}}
                        />
                        <Text>Ernest Chakhoyan</Text>
                </View>


                <TouchableOpacity
                    style={styles.sign_out}
                    onPress={handleLogout}
                >
                        <Text style={{marginRight: metrics.spacing_md()}}>Sign out</Text>
                        <Icon
                            type="font-awesome-5"
                            name="sign-out-alt"
                            color={theme.colors.secondary}
                        />
                </TouchableOpacity>

            </ScreenWrapper>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 0,
        alignItems: 'center',
        position: "relative",
        width: '100%',
        height: sheetHeight,
        borderTopLeftRadius: sheetBorderRadius,
        borderTopRightRadius: sheetBorderRadius,
        padding: metrics.spacing_lg()
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: metrics.spacing_md(),
        borderBottomColor: colors.light,
        borderBottomWidth: 1
    },
    bar: {
        position: "absolute",
        width: 50,
        height: 5,
        top: -15,
        backgroundColor: colors.light,
        borderRadius: 10
    },
    sign_out: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        bottom: 40
    }
});

export default withTheme(Sheet);