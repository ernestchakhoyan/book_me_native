import React from 'react';
import {
    View,
    StyleSheet
} from "react-native";
import { useTranslation } from "react-i18next";
import {
    box_shadow
} from "../styles/common";

import { ScreenWrapper } from "../containers";
import { Text } from "react-native-elements";
import { ThemeConsumer } from 'react-native-elements';
import { metrics } from "../styles/vars";

function About() {
    const { t } = useTranslation();
    return (
        <ScreenWrapper>
            <View style={{
                ...box_shadow,
                ...styles.container,
                backgroundColor: "#54a5f4"
            }}>
                <Text h3 style={styles.marginBottom}>{t("ap1")}</Text>
                <Text style={styles.text}>{t("ap2")}</Text>
                <Text style={styles.text}>{t("ap3")}</Text>
                <Text style={styles.text}>{t("email")}: <Text style={styles.text}>chakhoyanernest@gmail.com </Text></Text>
                <Text style={styles.text}>{t("phone number")}: <Text  style={styles.text}>+37441199591 </Text></Text>
                <Text style={styles.text}>{t("sincerely")},</Text>
                <Text style={styles.text}>book.me</Text>
            </View>
        </ScreenWrapper>
    );}

const styles = StyleSheet.create({
    container: {
        padding: metrics.spacing_md(),
        margin: metrics.spacing_md()
    },
    text: {
        lineHeight: 22
    },
    marginBottom: {
        marginBottom: metrics.spacing_md()
    }
});

export default About;