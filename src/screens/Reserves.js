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
import { withApollo } from "@apollo/client/react/hoc";

let disableLoadMore = false;

function Reserves({ theme, client }) {
    const [ accessToken, setAccessToken ] = React.useState("");
    const [ refreshing, setRefreshing ] = React.useState(false);
    const { t } = useTranslation();

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
        },
        onCompleted: () => {
            return loadMore(true);
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
                    seatId,
                    status
                }
            }
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
            update: (cache, { data: { removeReservation } }) => {
                if(removeReservation.id){
                    cache.evict({
                        id: cache.identify({
                            __typename: "ReserveType",
                            id: removeReservation?.id,
                        }),
                    });
                }
            }
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

        if (reservesData && reservesData.length > 0 && reservesData.length < 20) {
            return;
        }

        getReserves({
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            },
            variables: {
                page: pageToGet || 1,
                limit: config.fetch_limit
            },
        });
    };

    const loadMore = async (afterRemove) => {
        const pageToGet = (reservesData && reservesData.length > 0)
            ? Math.round(reservesData.length / 20) + 1
            : 1;

        const data = client.readQuery({
            query: GET_RESERVES,
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            },
            variables: {
                page: pageToGet - 1,
                limit: config.fetch_limit
            }
        });

        if (disableLoadMore) {
            return;
        }

        setRefreshing(true);

        const response = await client.query({
            query: GET_RESERVES,
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            },
            variables: {
                page: pageToGet,
                limit: config.fetch_limit
            }
        });

        setRefreshing(false);

        if (!response.data) {
            return;
        }

        if (response?.data?.reserves.length) {
            const newData = afterRemove
                ? [ ...data.reserves, response.data.reserves[0] ]
                : [ ...data.reserves, ...response.data.reserves ];

            client.writeQuery({
                query: GET_RESERVES,
                context: {
                    headers: {
                        "Authorization": `${accessToken}`
                    }
                },
                data: {
                    reserves: newData
                },
                variables: {
                    page: pageToGet - 1,
                    limit: config.fetch_limit
                }
            });
        }

        if (response.data.reserves.length < config.fetch_limit && !afterRemove) {
            return disableLoadMore = true;
        }
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

    if (error || !data || !data.reserves.length) {
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

    const pageToGet = (reservesData && reservesData.length > 0)
        ? Math.round(reservesData.length / 20) + 1
        : 1;

    return (
        <ScreenWrapper style={styles.container}>
            <Table
                data={reservesData}
                updateCallback={handleUpdate}
                deleteCallback={handleRemove}
                loading={loading}
                error={error}
                refreshing={refreshing}
                loadMoreCallback={loadMore}
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

export default withApollo(withTheme(Reserves));