import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
    StyleSheet
} from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import { BottomSheet } from "./src/containers";
import client from "./src/graphql";
import "./src/services/i18n";

export default function App() {
    return (
        <ApolloProvider client={client}>
            <BottomSheet />
            <AppNavigation />
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
