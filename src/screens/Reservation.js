import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import Spacer from "react-native-spacer";
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
import { RESERVE_MUTATION } from "../graphql/mutations/reserve";
import { useMutation } from "@apollo/client";

const reservationFields = [ "price", "status", "capacity" ];

const renderFieldValues = (field, value, t) => {
    switch (field) {
        case "price":
            return `${value} AMD`;
        case "status":
            return value ? t("busy") : t("free");
        default:
            return value;
    }
};

function Reservation({ navigation, route, theme }) {
    const { t } = useTranslation();
    const { seat, spotId } = route.params;

    const [ username, setUsername ] = React.useState("");
    const [ phoneNumber, setPhoneNumber ] = React.useState("");
    const [ note, setNote ] = React.useState("");
    const [ date, setDate ] = React.useState(new Date());
    const [ dateShown, setDateShow ] = React.useState(false);
    const [ timeShown, setTimeShow ] = React.useState(false);
    const [ usernameErrorMessage, setUsernameErrorMessage ] = React.useState("");
    const [ phoneNumberErrorMessage, setPhoneNumberErrorMessage ] = React.useState("");
    const [ dateErrorMessage, setDateErrorMessage ] = React.useState("");
    const [ reservationErrorMessage, setReservationError ] = React.useState("");

    const RESERVATION_ERROR = t("Error on reservation");

    const [
        reserve, {
            loading: mutationLoading,
            error: mutationError
        }
    ] = useMutation(RESERVE_MUTATION, {
        onCompleted: () => {
            navigation.navigate("ReservationSuccess", { date: date.toLocaleString(), name });
        }
    });

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
        resetErrors();

        const now = new Date();
        if (now > new Date(date)) {
            console.log("bye");
            setDateErrorMessage("You can not reserve with passed date");
        }
    };

    const resetErrors = () => {
        setDateErrorMessage("");
        setPhoneNumberErrorMessage("");
        setUsernameErrorMessage("");
    };

    const resetData = () => {
        setUsername("");
        setPhoneNumber("");
        setNote("");
        setDate(new Date());
    };

    const handleValidations = () => {
        if (!username.trim().length) {
            setUsernameErrorMessage("This field is required");
        }
        if (!phoneNumber.trim().length) {
            setPhoneNumberErrorMessage("This field is required");
        }

        const phoneValidationError = phoneNumber.trim().length !== 12 && phoneNumber.trim().length !== 13 && phoneNumber.trim().length !== 9;

        if (phoneValidationError) {
            return setPhoneNumberErrorMessage("Please enter valid phone number");
        }

        return username.trim().length && phoneNumber.trim().length && !phoneValidationError;
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

    const { name, description, images, id, status } = seat;
    const handleReservation = async () => {
        resetErrors();

        if (!handleValidations()) {
            return;
        }

        try {
            await reserve({
                variables: {
                    spotId,
                    seatId: id,
                    data: {
                        fullName: username,
                        date: date,
                        phoneNumber,
                        notes: note,
                        status,
                        seatName: name
                    }
                }
            });
            resetData();
        } catch (error) {
            setReservationError(RESERVATION_ERROR);
            console.log("Error", error);
        }
    };

    React.useEffect(
        () => navigation.addListener("blur", () => resetData()),
        []
    );

    return (
        <Spacer style={centered_screen} spaceMargin={10}>
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
                                                    style={styles.text}>{renderFieldValues(item, seat[ item ], t)}</Text>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                            <View style={styles.item}>
                                <View style={styles.date_picker}>
                                    <Button
                                        type="clear"
                                        titleStyle={{ color: colors.customText }}
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
                                        titleStyle={{ color: colors.customText }}
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
                                        titleStyle={{ color: colors.customText }}
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
                                        title="Submit"
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
                                    errorMessage={dateErrorMessage}
                                    errorStyle={{ color: theme.colors.error }}
                                    editable={false}
                                    value={date.toLocaleString()}
                                    autoCorrect={false}
                                    label={t("Next appointment")}
                                    labelProps={{ style: styles.label }}
                                    inputContainerStyle={{ borderBottomColor: colors.customText }}
                                    style={{ color: colors.customText }}
                                    leftIcon={
                                        <Icon
                                            name='calendar'
                                            type="font-awesome"
                                            size={24}
                                            color={colors.customText}
                                        />
                                    }
                                />
                            </View>
                            <View style={styles.item}>
                                <Input
                                    value={username}
                                    errorMessage={usernameErrorMessage}
                                    errorStyle={{ color: theme.colors.error }}
                                    autoCorrect={false}
                                    label={t("fullname")}
                                    labelProps={{ style: styles.label }}
                                    inputContainerStyle={{ borderBottomColor: colors.customText }}
                                    style={{ color: colors.customText }}
                                    leftIcon={
                                        <Icon
                                            name='user-circle'
                                            type="font-awesome"
                                            size={24}
                                            color={colors.customText}
                                        />
                                    }
                                    onChangeText={text => {
                                        resetErrors();
                                        setUsername(text);
                                    }}
                                />
                            </View>
                            <View style={styles.item}>
                                <Input
                                    value={phoneNumber}
                                    errorMessage={phoneNumberErrorMessage}
                                    errorStyle={{ color: theme.colors.error }}
                                    keyboardType="numeric"
                                    label={t("phone number")}
                                    labelProps={{ style: styles.label }}
                                    inputContainerStyle={{ borderBottomColor: colors.customText }}
                                    style={{ color: colors.customText }}
                                    leftIcon={
                                        <Icon
                                            name='phone-square'
                                            type="font-awesome"
                                            size={24}
                                            color={colors.customText}
                                        />
                                    }
                                    onChangeText={text => {
                                        resetErrors();
                                        setPhoneNumber(text);
                                    }}
                                />
                            </View>
                            <View style={styles.item}>
                                <Input
                                    value={note}
                                    errorMessage={mutationError || reservationErrorMessage}
                                    label={t("notes")}
                                    labelProps={{ style: styles.label }}
                                    inputContainerStyle={{
                                        borderBottomColor: colors.customText,
                                    }}
                                    style={{ color: colors.customText }}
                                    leftIcon={
                                        <Icon
                                            name='sticky-note'
                                            type="font-awesome"
                                            size={24}
                                            color={colors.customText}
                                        />
                                    }
                                    onChangeText={text => {
                                        resetErrors();
                                        setNote(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Button
                                    buttonStyle={{ backgroundColor: colors.primary }}
                                    style={button}
                                    title={t("reserve")}
                                    loading={mutationLoading}
                                    onPress={handleReservation}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </ScreenWrapper>
        </Spacer>
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
        fontSize: 16,
        color: colors.customText
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