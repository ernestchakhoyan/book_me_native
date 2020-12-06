import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View
} from "react-native";
import {
    Button,
    Icon,
    Text
} from "react-native-elements";

import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "../containers";

import {
    box_shadow,
    centered_screen
} from "../styles/common";
import { metrics } from "../styles/vars";
import colors from "../theme/colors";

function ReservationSuccess({ navigation, route }) {
    const { t } = useTranslation();
    const { date, name } = route.params;

    const redirectToPlaces = () => {
        navigation.navigate("Home");
    };

    return (
        <ScreenWrapper customStyles={centered_screen}>
            <SafeAreaView>
                <View style={{
                    ...box_shadow,
                    ...centered_screen,
                    ...styles.container,
                }}>
                    <Text h1 style={styles.marginBottom}>
                        {t("success")}
                    </Text>
                    <View style={styles.row}>
                        <Icon
                            style={styles.icon}
                            type="font-awesome"
                            name="check-circle"
                            color={colors.success}
                            size={30}
                        />
                        <Text style={styles.text}>
                            Your reservation in {name} room successfully created at {date}
                        </Text>
                    </View>
                    <Button
                        title="Go to places"
                        onPress={redirectToPlaces}
                    />
                </View>
            </SafeAreaView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: metrics.spacing_md(),
        margin: metrics.spacing_md(),
        backgroundColor: "#54a5f4",
        maxHeight: 200
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: metrics.spacing_md(),
    },
    icon: {
        marginRight: metrics.spacing_md(),
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

export default ReservationSuccess;