import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useTranslation } from "react-i18next";

function Home(props) {
    const { t, i18n } = useTranslation();
    return (
        <View>
            <Text>{t("notes")}</Text>
            <Button title="Click me" onPress={() => i18n.changeLanguage("am")} />
        </View>
    );
}

const styles = StyleSheet.create({});

export default Home;