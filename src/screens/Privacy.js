import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { Text } from "react-native-elements";

import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "../containers";

import { box_shadow } from "../styles/common";
import { metrics } from "../styles/vars";

function Privacy() {
    const { t } = useTranslation();
    return (
        <ScreenWrapper>
            <SafeAreaView>
            <View style={{
                ...box_shadow,
                ...styles.container,
                backgroundColor: "#54a5f4"
            }}>
                <ScrollView>
                    <Text h1 style={styles.marginBottom}>
                        {t("privacy policy")}
                    </Text>
                    <Text style={styles.text}>{t("pp1")}</Text>
                    <Text style={styles.text}>{t("pp2")}</Text>
                    <Text style={styles.text}>{t("pp3")}</Text>

                    <Text h4 style={{ ...styles.marginBottom, ...styles.marginTop }}>{t("pt1")}</Text>
                    <Text style={styles.text}>{t("pp4")}</Text>

                    <Text h4 style={{ ...styles.marginBottom, ...styles.marginTop }}>{t("pt2")}</Text>
                    <Text style={styles.text}>{t("pp5")}</Text>
                    <Text style={styles.text}>{t("pp6")}</Text>

                    <Text h4 style={{ ...styles.marginBottom, ...styles.marginTop }}>{t("pt3")}</Text>
                    <Text style={styles.text}>{t("pp7")}</Text>
                </ScrollView>
            </View>
            </SafeAreaView>
        </ScreenWrapper>
    );
}

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
    },
    marginTop: {
        marginTop: metrics.spacing_md()
    }
});

export default Privacy;