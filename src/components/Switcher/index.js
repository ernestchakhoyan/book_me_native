import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../../theme/colors";
import { centered_screen } from "../../styles/common";

const Switcher = ({ isEnabled, callback }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const thumbColor = isDark ? colors.light : colors.light;

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{
                    false: colors.secondary,
                    true: colors.success
                }}
                thumbColor={isEnabled ? thumbColor : thumbColor}
                ios_backgroundColor={thumbColor}
                onValueChange={callback}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...centered_screen
    }
});

export default Switcher;