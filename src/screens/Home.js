import React from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { withTheme } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { GET_SPOTS } from "../graphql/queries/spots";
import { ScreenWrapper } from "../containers";
import { Card, Text } from "../components";

import { metrics } from "../styles/vars";
import { centered_screen } from "../styles/common";

function Home({ navigation, theme }) {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(GET_SPOTS, {
        fetchPolicy: "cache-first"
    });

    if(loading){
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                </View>
            </ScreenWrapper>
        )
    }

    const spots = data && data.spots ? data.spots : [];
    if (error || !spots.length) {
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <Text h4>{t("No places to display")}</Text>
                </View>
            </ScreenWrapper>
        );
    }

    const navigateToSeats = () => {
        navigation.navigate("Seats");
    }

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text h2>{t("places")}</Text>
            </View>
            <ScrollView
                style={styles.scroll_wrapper}
                contentContainerStyle={styles.scroll_content}
            >
                {
                    spots.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={navigateToSeats}
                            >
                                <Card
                                    customStyles={{
                                        backgroundColor: theme.colors.card_bg,
                                        borderColor: theme.colors.screenBG,
                                        borderRadius: metrics.border_radius
                                    }}
                                    titleStyles={styles.card_title}
                                    title={item.name}
                                >
                                    <View style={styles.card_content}>
                                        <Image
                                            style={styles.image}
                                            resizeMode="contain"
                                            source={{ uri: item.logo }}
                                        />
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: metrics.spacing
    },
    scroll_wrapper: {
        width: "100%"
    },
    scroll_content: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%"
    },
    card: {
        flexBasis: "50%",
        maxWidth: 180,
        marginRight: metrics.spacing,
        marginBottom: metrics.spacing,
        borderRadius: metrics.border_radius
    },
    card_content: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 100
    },
    card_title: {
        fontSize: 16
    }
});

export default withTheme(Home);