import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { withTheme } from "react-native-elements";
import { metrics } from "../../styles/vars";

function ScreenWrapper(props) {
    const { children, customStyles, theme } = props;

    return (
        <View style={{
            backgroundColor: theme.colors.screenBG,
            ...styles.wrapper,
            ...customStyles
        }}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        paddingTop: metrics.spacing_md()
    }
});

export default withTheme(ScreenWrapper);