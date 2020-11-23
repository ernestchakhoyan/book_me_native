import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import { BottomSheet } from "./src/containers";

export default function App() {
    return (
        <>
            <BottomSheet />
            <AppNavigation />
        </>
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
