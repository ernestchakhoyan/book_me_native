import React from "react";
import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { withTheme } from 'react-native-elements';
import { themePicker } from "../../services/theme";

function ThemeLayout({ children,updateTheme }) {
    const colorScheme = useColorScheme();

    React.useEffect(() => {
        const theme = themePicker(colorScheme);
        updateTheme(theme);
    },[colorScheme])

    return (
        <>
            {children}
        </>
    );
}

const styles = StyleSheet.create({});

export default withTheme(ThemeLayout);