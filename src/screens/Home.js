import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { Button, Text } from 'react-native-elements';
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { GET_SPOTS } from "../graphql/queries/spots";

import {
    centered_screen,
    dark_bg
} from "../styles/common";
import { useColorScheme } from "react-native-appearance";

function Home({ navigation }) {
    const { t, i18n } = useTranslation();
    const {loading, error, data} = useQuery(GET_SPOTS);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    if(loading){
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <View style={{ ...styles.wrapper, backgroundColor: isDark ? dark_bg.backgroundColor : "inherit" }}>
            <Text>{t("notes")}</Text>
            <Button title="Click me" onPress={() => {
                i18n.changeLanguage("am");
                navigation.navigate("Reservation");
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: centered_screen
});

export default Home;