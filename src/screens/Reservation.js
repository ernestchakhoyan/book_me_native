import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { metrics } from "../styles/vars";
import {
    Carousel,
    Input,
    Text
} from "../components";
import { ScreenWrapper } from "../containers";
import {
    box_shadow,
    button,
    centered_screen
} from "../styles/common";
import { useTranslation } from "react-i18next";
import {
    Button,
    Icon,
    withTheme
} from "react-native-elements";
import colors from "../theme/colors";

const reservationFields = [ "price", "status", "capacity" ];

function Reservation({ route, theme }) {
    const { t } = useTranslation();
    const { seat } = route.params;

    const [ username, setUsername ] = React.useState("");
    const [ phoneNumber, setPhoneNumber ] = React.useState("");
    const [ note, setNote ] = React.useState("");
    const [ date, setDate ] = React.useState(new Date());
    const [ dateShown, setDateShow ] = React.useState(false);
    const [ timeShown, setTimeShow ] = React.useState(false);

    const handleReservation = () => {
        console.log(username, phoneNumber, note);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const datepickerToggle = (mode) => {
        const isModeTime = mode === "time";
        setDateShow(!isModeTime);
        setTimeShow(isModeTime);
    };

    const submitDate = () => {
        setDateShow(false);
        setTimeShow(false);
    };

    if (!route || !route.params || !seat) {
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <Text h4>{t("Reservation is not available")}</Text>
                </View>
            </ScreenWrapper>
        );
    }

    const { name, description, images } = seat;
    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text h2>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.carousel_container}>
                        <Carousel images={images} />
                    </View>
                    <View
                        style={{
                            ...box_shadow,
                            ...styles.content,
                            backgroundColor: "#54a5f4"
                        }}
                    >
                        {
                            reservationFields.map((item) => {
                                return (
                                    <View key={item} style={styles.item_container}>
                                        <View style={styles.item}>
                                            <Text style={styles.text}>{t(`${item}`)}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text
                                                style={styles.text}>{item === "price" ? `${seat[ item ]} AMD` : seat[ item ]}</Text>
                                        </View>
                                    </View>
                                );
                            })
                        }
                        <View style={styles.item}>
                            <View style={styles.date_picker}>
                                <Button
                                    type="clear"
                                    titleStyle={{color: colors.customText}}
                                    icon={
                                        <Icon
                                            name="calendar"
                                            type="font-awesome"
                                            size={15}
                                            color={colors.customText}
                                            style={{ marginRight: metrics.spacing }}
                                        />
                                    }
                                    title="Date"
                                    onPress={() => datepickerToggle("date")}
                                />
                                <Button
                                    type="clear"
                                    titleStyle={{color: colors.customText}}
                                    icon={
                                        <Icon
                                            name="clock-o"
                                            type="font-awesome"
                                            size={15}
                                            color={colors.customText}
                                            style={{ marginRight: metrics.spacing }}
                                        />
                                    }
                                    onPress={() => datepickerToggle("time")}
                                    title="Time"
                                />
                                <Button
                                    type="clear"
                                    titleStyle={{color: colors.customText}}
                                    icon={
                                        <Icon
                                            name="check-circle"
                                            type="font-awesome"
                                            size={15}
                                            color={colors.customText}
                                            style={{ marginRight: metrics.spacing }}
                                        />
                                    }
                                    onPress={() => submitDate("time")}
                                    title="Time"
                                />
                            </View>
                            <View>
                                {dateShown && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                                {timeShown && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Input
                                editable={false}
                                value={date.toLocaleString()}
                                autoCorrect={false}
                                label={t("Next appointment")}
                                labelProps={{ style: styles.label }}
                                inputContainerStyle={{ borderBottomColor: colors.customText }}
                                leftIcon={
                                    <Icon
                                        name='calendar'
                                        type="font-awesome"
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                }
                            />
                        </View>
                        <View style={styles.item}>
                            <Input
                                autoCorrect={false}
                                label={t("fullname")}
                                keyboardType="numeric"
                                labelProps={{ style: styles.label }}
                                onChangeText={text => setUsername(text)}
                                inputContainerStyle={{ borderBottomColor: colors.customText }}
                                leftIcon={
                                    <Icon
                                        name='user-circle'
                                        type="font-awesome"
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                }
                            />
                        </View>
                        <View style={styles.item}>
                            <Input
                                label={t("phone number")}
                                labelProps={{ style: styles.label }}
                                onChangeText={text => setPhoneNumber(text)}
                                inputContainerStyle={{ borderBottomColor: colors.customText }}
                                leftIcon={
                                    <Icon
                                        name='phone-square'
                                        type="font-awesome"
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                }
                            />
                        </View>
                        <View style={styles.item}>
                            <Input
                                label={t("notes")}
                                onChangeText={text => setNote(text)}
                                labelProps={{ style: styles.label }}
                                inputContainerStyle={{ borderBottomColor: colors.customText }}
                                leftIcon={
                                    <Icon
                                        name='sticky-note'
                                        type="font-awesome"
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                }
                            />
                        </View>
                        <View>
                            <Button
                                style={button}
                                title={t("reserve")}
                                loading={null}
                                onPress={handleReservation}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: metrics.spacing_md()
    },
    description: {
      fontSize: 14
    },
    container: {
        justifyContent: "center",
        width: "100%"
    },
    safeArea: {
        alignItems: "center"
    },
    content: {
        maxWidth: 320,
        width: "100%",
        padding: metrics.spacing_md(),
        margin: metrics.spacing_md()
    },
    item_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flex: 1,
        marginBottom: metrics.spacing,
        padding: metrics.spacing
    },
    text: {
        fontSize: 16
    },
    carousel_container: {
        width: "100%"
    },
    date_picker: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    label: {
        color: colors.customText,
        fontSize: 12
    }
});

export default withTheme(Reservation);