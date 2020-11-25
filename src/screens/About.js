import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import { useTranslation } from "react-i18next";
import {
    box_shadow,
    centered_screen
} from "../styles/common";

function About(props) {
    const { t } = useTranslation();
    return (
        <View style={centered_screen}>
            <View style={box_shadow}>
                <Text>{t("ap1")}</Text>
                <Text>{t("ap2")}</Text>
                <Text style={{marginBottom: 30}}>{t("ap3")}</Text>
                <Text>{t("email")}: <Text>chakhoyanernest@gmail.com </Text></Text>
                <Text style={{marginTop: -20}}>{t("phone number")}: <Text>+37441199591 </Text></Text>
                <Text>{t("sincerely")},</Text>
                <Text style={{marginTop: -20}}>book.me</Text>
            </View>
        </View>
    );}

const styles = StyleSheet.create({});

export default About;