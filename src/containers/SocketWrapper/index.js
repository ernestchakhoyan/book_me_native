import React from "react";
import {
    useSubscription
} from "@apollo/client";

import { useTranslation } from "react-i18next";
import { Context as AuthContext } from "../../context/AuthContext";
import { dateiOSParser } from "../../services/date";
import { isAuthorized } from "../../utils/authorization";
import { GET_RESERVES } from "../../graphql/queries/reserves";
import { WS_NEW_RESERVE } from "../../graphql/subscriptions/reserve";
import { WS_SEAT_UPDATE } from "../../graphql/subscriptions/seat";
import { getItemFromStorage } from "../../services/storage";
import config from "../../constants/config";

const ws_events = {
    new_reserve: "new_reserve",
    status_update: "status_update",
}

function SocketProvider({ children }) {
    const { state: { token } } = React.useContext(AuthContext);
    const {t} = useTranslation();

    const {} = useSubscription(WS_NEW_RESERVE, {
        onSubscriptionData: async({ subscriptionData,client }) => {
            const { newReserve } = subscriptionData.data;
            const { fullName, date, seatName } = newReserve;
            const notificationDate = new Date(Date.parse(dateiOSParser(date))).toLocaleString()
            const message = t("new reservation", { fullName, notificationDate });
            const title = t("new reserve", { seatName });

            return updateCache(client, ws_events.new_reserve, newReserve);
        },
        skip: !token || !isAuthorized()
    });

    const {} = useSubscription(WS_SEAT_UPDATE, {
        onSubscriptionData: async({ subscriptionData,client }) => {
            const {updateSeatStatus} = subscriptionData.data;
            return updateCache(client, ws_events.status_update, updateSeatStatus);
        },
        skip: false
    });

    const updateCache = async (client, action, data) => {
        try {
            const token = await getItemFromStorage("access_token");

            const response = await client.readQuery({
                query: GET_RESERVES,
                context: {
                    headers: {
                        "Authorization": `${token}`
                    }
                },
                variables: {
                    page: 1,
                    limit: 20
                }
            });

            if (response?.reserves.length) {
                const cache = response.reserves;
                client.cache.writeQuery({
                    __typename: "ReserveType",
                    query: GET_RESERVES,
                    context: {
                        headers: {
                            "Authorization": `${token}`
                        }
                    },
                    data: {
                        reserves: handleCacheData(action,cache,data)
                    },
                    variables: {
                        page: 1,
                        limit: config.fetch_limit
                    }
                });
            }
        }catch (e) {
            return null;
        }
    }

    const handleCacheData = (action, cache, data) => {
        switch (action){
            case ws_events.new_reserve:
                return [data, ...cache];
            case ws_events.status_update:
                return cache.map(item => {
                    if(item.seatId === data.id){
                        return {...item, status: data.status }
                    }
                    return item;
                });
            default:
                return null;
        }
    }

    return (
        <>
            {children}
        </>
    );
}

export default SocketProvider;