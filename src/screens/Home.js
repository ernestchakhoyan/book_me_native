import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useTranslation } from "react-i18next";
import { GET_SPOTS } from "../graphql/queries/spots";
import { useQuery } from "@apollo/client";

function Home(props) {
    const { t, i18n } = useTranslation();
    const {loading, error, data} = useQuery(GET_SPOTS);

    if(loading){
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    console.log(data);

    return (
        <View>
            <Text>{t("notes")}</Text>
            <Button title="Click me" onPress={() => i18n.changeLanguage("am")} />
        </View>
    );
}

const styles = StyleSheet.create({});

export default Home;