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
let disableSearchLoadMore = false;
let typingTimeout = null;

function Reserves({ navigation, theme, client }) {
    const [ accessToken, setAccessToken ] = React.useState("");
    const [ refreshing, setRefreshing ] = React.useState(false);
    const [ search, setSearch ] = React.useState("");
    const [ searchedReserves, setSearchedReserves ] = React.useState([]);
    const [ searchFinished, setSearchFinish ] = React.useState(false);
    const { t } = useTranslation();

    const [ getReserves, {
        loading,
        error,
        data,
        called,
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

    const handleSubscription = () => {
        return subscribeToMore({
            document: WS_NEW_RESERVE, updateQuery: (prev, { subscriptionData }) => {
                return Object.assign({}, prev, {
                    reserves: [ ...prev.reserves, subscriptionData.data.newReserve ]
                });
            }
        });
    };

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
            },
            update: () => {
                if(search.trim().length){
                    return handleUpdateOnSearchedReserves(id, status);
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
                if(removeReservation.id && !search.trim().length){
                    cache.evict({
                        id: cache.identify({
                            __typename: "ReserveType",
                            id: removeReservation?.id,
                        }),
                    });
                }
            }
        }).then(() => {
            return loadMore(true, id);
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

    const loadMore = async (afterRemove, id) => {
        if(search){
            return handleSearchCaching(search, true, afterRemove, id);
        }

        if (disableLoadMore && !search.trim()) {
            return;
        }

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

    const handleSearchCaching  = async (search, loadMore, afterRemove, id) => {
        if (disableSearchLoadMore && !afterRemove) {
            return;
        }
        setRefreshing(true);
        setSearchFinish(false);

        const response = await client.query({
            fetchPolicy: "network-only",
            query: GET_RESERVES,
            context: {
                headers: {
                    "Authorization": `${accessToken}`
                }
            },
            variables: {
                page: loadMore && !afterRemove ? pageToGet : pageToGet - 1,
                limit: config.fetch_limit,
                search
            }
        });
        setSearchFinish(true);
        setRefreshing(false);

        if (!response.data) {
            return;
        }

        if (response?.data?.reserves.length) {
           setSearchedReserves( (prevState)=> {
               if (afterRemove){
                   const updatedPrevState = prevState.filter(item => item.id !== id);
                   if(!disableSearchLoadMore){
                       return [...updatedPrevState, response.data.reserves[response.data.reserves.length - 1]];
                   }else{
                       return updatedPrevState;
                   }
               }else{
                   if(loadMore){
                       return [...prevState, ...response.data.reserves]
                   }else{
                       return response.data.reserves;
                   }
               }
           });

           if(response.data.reserves.length < config.fetch_limit && !afterRemove){
               disableSearchLoadMore = true;
           }
        }else{
            if(searchedReserves.length){
                setSearchedReserves( (prevState)=> {
                    if (afterRemove){
                        return prevState.filter(item => item.id !== id);
                    }
                });
            }else{
                setSearchedReserves([]);
            }
        }
    }

    const searchReserve = (query) => {
        disableSearchLoadMore = false;
        setSearch(query);

        if(!query.trim().length){
            setSearchFinish(false);
            return setSearchedReserves([]);
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        typingTimeout = setTimeout(() => {
            return handleSearchCaching(query);
        }, 1000);
    };

    const handleUpdateOnSearchedReserves = (id,status) => {
        setSearchedReserves((prevState) => {
            return prevState.map(item => {
                if(item.id === id) {
                    return { ...item, status }
                }
                return item;
            })
        })
    }

    const resetSearch = () => {
        setSearchFinish(false);
        setSearchedReserves([]);
        setSearch("");
    }

    React.useEffect(() => {
        if (called) {
            const unsubscribe = handleSubscription();
            return unsubscribe();
        }

    }, [ called ]);

    React.useEffect(() => {
        fetchReserves();
    }, []);

    React.useEffect(
        () => navigation.addListener("blur", () => resetSearch()),
        []
    );

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
    const reservesData = searchedReserves.length
        ? searchedReserves
        : (reserves.length ? reserves.map(o => ({ ...o })) : []);

    const pageToGet = (reservesData && reservesData.length > 0)
        ? Math.round(reservesData.length / 20) + 1
        : 1;

    return (
        <ScreenWrapper style={styles.container}>
            <Table
                data={reservesData}
                updateCallback={handleUpdate}
                deleteCallback={handleRemove}
                searchCallback={searchReserve}
                searchValue={search}
                loading={loading}
                error={error}
                refreshing={refreshing}
                loadMoreCallback={loadMore}
                searchIsEmpty={searchFinished && !searchedReserves.length}
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