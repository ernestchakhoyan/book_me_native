import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View
} from "react-native";
import { withTheme } from "react-native-elements";
import { useTranslation } from "react-i18next";

import {
    useLazyQuery,
    useMutation
} from "@apollo/client";
import { GET_RESERVES } from "../graphql/queries/reserves";
import { UPDATE_SEATS_STATUS } from "../graphql/mutations/seats";
import { REMOVE_RESERVATION } from "../graphql/mutations/reserve";
import { getItemFromStorage } from "../services/storage";
import { WS_NEW_RESERVE } from "../graphql/subscriptions/reserve";
import {
    ScreenWrapper,
    Table
} from "../containers";
import { Text } from "../components";

import { centered_screen } from "../styles/common";


function Reserves({theme}) {
    const [ accessToken, setAccessToken ] = React.useState("");
    const { t } = useTranslation();

    const [ getReserves, {
        loading,
        error,
        data,
        called,
        refetch: refetchReserves,
        subscribeToMore
    } ] = useLazyQuery(GET_RESERVES);

    const [ updateSeatStatus ] = useMutation(UPDATE_SEATS_STATUS, {
        ignoreResults: true,
        context: {
            headers: {
                "Authorization": `${accessToken}`
            }
        }
    });

    const [ removeReservation ] = useMutation(REMOVE_RESERVATION, {
        ignoreResults: true,
        context: {
            headers: {
                "Authorization": `${accessToken}`
            }
        }
    });

    const handleUpdate = ({ id, status, seatId, resolve }) => {
        return updateSeatStatus({
            variables: {
                id,
                status,
                seatId
            }
        })
            .then(() => {
                resolve();
                return refetchReserves();
            });
    };

    const handleRemove = ({ id, resolve }) => {
        return removeReservation({
            variables: {
                id
            }
        }).then(() => {
            resolve();
            return refetchReserves();
        });
    };

    const handleSubscription = () => {
        return subscribeToMore({
            document: WS_NEW_RESERVE, updateQuery: (prev, { subscriptionData }) => {
                return Object.assign({}, prev, {
                    reserves: [ ...prev.reserves, subscriptionData.data.newReserve ]
                });
            }
        });
    };

    const fetchReserves = async () => {
        const accessToken = await getItemFromStorage("access_token");
        setAccessToken(accessToken);
        getReserves({
            fetchPolicy: "cache-and-network",
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            }
        });
    };

    React.useEffect(() => {
        if (called) {
           const unsubscribe = handleSubscription();
           return unsubscribe();
        }

    }, [ called ]);

    React.useEffect(() => {
        fetchReserves();
    }, []);

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

    if(error || !data){
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <Text h4>{t("No reserves")}</Text>
                </View>
            </ScreenWrapper>
        )
    }

    const reserves = data.reserves || [];
    const reservesData = reserves.length ? reserves.map(o => ({ ...o })) : [];

    return (
        <ScreenWrapper style={styles.container}>
            <Table
                data={reservesData.reverse()}
                updateCallback={handleUpdate}
                deleteCallback={handleRemove}
                loading={loading}
                error={error}
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    }
});

export default withTheme(Reserves);