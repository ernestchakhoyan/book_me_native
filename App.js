import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
    AppearanceProvider,
    useColorScheme
} from "react-native-appearance";
import { ThemeProvider } from "react-native-elements";

import client from "./src/graphql";
import { ThemeLayout } from "./src/layouts";
import AppNavigation from "./src/navigation/AppNavigation";
import { themePicker } from "./src/services/theme";

import "./src/services/i18n";

export default function App() {
    const colorScheme = useColorScheme();

    return (
        <ApolloProvider client={client}>
            <AppearanceProvider>
                <ThemeProvider theme={themePicker(colorScheme)} useDark={colorScheme === "dark"}>
                    <ThemeLayout>
                        <AppNavigation />
                    </ThemeLayout>
                </ThemeProvider>
            </AppearanceProvider>
        </ApolloProvider>
    );
}
