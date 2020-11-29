import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { BottomSheet } from "react-native-btr";
import {
    Icon,
    Text,
    withTheme
} from "react-native-elements";
import UserAvatar from "../../components/UserAvatar";
import ScreenWrapper from "../ScreenWrapper";
import colors from "../../theme/colors";
import { metrics } from "../../styles/vars";

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
    const { visible, toggleCallback, theme } = props;

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
                            containerStyle={{backgroundColor: theme.colors.secondary,  marginRight: metrics.spacing_md()}}
                            titleStyle={{color: "#000"}}
                        />
                        <Text>Ernest Chakhoyan</Text>
                </View>


                <View style={styles.sign_out}>
                        <Text style={{marginRight: metrics.spacing_md()}}>Sign out</Text>
                        <Icon
                            type="font-awesome-5"
                            name="sign-out-alt"
                            color={theme.colors.secondary}
                        />
                </View>

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