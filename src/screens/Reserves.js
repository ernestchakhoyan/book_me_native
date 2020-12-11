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
import config from "../constants/config";

function Reserves({ theme }) {
    const [ accessToken, setAccessToken ] = React.useState("");
    const [ refreshing, setRefreshing ] = React.useState(false);
    const { t } = useTranslation();

    const pageToGet = (reservesData && reservesData.length > 0)
        ? Math.round(reservesData.length / 20) + 1
        : 1;

    const [ getReserves, {
        loading,
        error,
        data,
        called,
        refetch: refetchReserves,
        subscribeToMore,
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

    const handleUpdate = ({ id, status, seatId }) => {
        return updateSeatStatus({
            variables: {
                id,
                status,
                seatId
            },
            optimisticResponse: {
                __typename: "Mutation",
                updateSeatStatus: {
                    __typename: "ReserveType",
                    id,
                    status
                }
            }
        }).then(
            () => {
                return refetchReserves();
            });
    };

    const handleRemove = ({ id }) => {
        return removeReservation({
            variables: {
                id
            },
            optimisticResponse: {
                __typename: "Mutation",
                removeReservation: {
                    __typename: "ReserveType",
                    id
                }
            },
            update: (proxy, { data: { removeReservation } }) => {
                const data = proxy.readQuery({
                    query: GET_RESERVES,
                    variables: {
                        page: pageToGet,
                        limit: config.fetch_limit,
                    }
                });
                const reserves = [ ...data.reserves.filter((item) => item.id !== removeReservation.id) ];

                setTimeout(() => {
                    proxy.writeQuery({
                        query: GET_RESERVES,
                        data: {
                            reserves
                        },
                        variables: {
                            page: pageToGet,
                            limit: config.fetch_limit
                        }
                    });
                }, 0);
            },
            refetchQueries: { query: [ GET_RESERVES ] }
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

        console.log(pageToGet);

        getReserves({
            fetchPolicy: "cache-and-network",
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            },
            variables: {
                page: pageToGet,
                limit: config.fetch_limit
            },
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

    if (loading) {
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                </View>
            </ScreenWrapper>
        );
    }

    if (error || !data) {
        return (
            <ScreenWrapper>
                <View style={centered_screen}>
                    <Text h4>{t("No reserves")}</Text>
                </View>
            </ScreenWrapper>
        );
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
                refreshing={refreshing}
                loadMoreCallback={fetchReserves}
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