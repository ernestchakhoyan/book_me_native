import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { withTheme } from "react-native-elements";

import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";

import { ScreenWrapper } from "../containers";
import {
    Card,
    Text
} from "../components";

import { GET_SEAT_BY_ID } from "../graphql/queries/seats";

import { centered_screen } from "../styles/common";
import { metrics } from "../styles/vars";


function Seats({ route, navigation, theme }) {
    const { t } = useTranslation();
    const {spotId, spotName} = route.params;

    const { loading, data: seatsData, subscribeToMore } = useQuery(GET_SEAT_BY_ID, {
        variables: { spotId },
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

    const seats = seatsData && seatsData.seats ? seatsData.seats : [];
    if(!spotId){
        return(
            <ScreenWrapper>
                <View style={centered_screen}>
                    <Text h4>{t("No seats to display")}</Text>
                </View>
            </ScreenWrapper>
        )
    }

    const navigateToReservation = (seat) => {
        navigation.navigate("Reservation", {seat})
    }

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text h2>{spotName}</Text>
            </View>
            <ScrollView
                style={styles.scroll_wrapper}
                contentContainerStyle={styles.scroll_content}
            >
                {
                    seats.map((item) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => navigateToReservation(item)}
                            >
                                <Card
                                    customStyles={{
                                        backgroundColor: theme.colors.card_bg,
                                        borderColor: theme.colors.screenBG,
                                        borderRadius: metrics.border_radius
                                    }}
                                    titleStyles={styles.card_title}
                                    title={item.name}
                                />
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </ScreenWrapper>
    );}

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

export default withTheme(Seats);