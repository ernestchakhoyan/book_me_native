import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    split
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getItemFromStorage } from "../services/storage";
import getEnvVars from "../../environment";

const {API_URL, WS_URL} = getEnvVars();
const uri = API_URL;
const ws_uri = WS_URL;
const httpLink = new HttpLink({ uri });

const wsLink = new WebSocketLink({
    uri: ws_uri,
    options: {
        reconnect: true,
        connectionParams: () => {
            if(!getItemFromStorage("access_token")){
                return null;
            }
            return {
                headers: {
                    "authorization": `Bearer ${getItemFromStorage("access_token")}`,
                },
            }
        },
    }
});

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === "OperationDefinition" && definition.operation === "subscription");
}, wsLink, httpLink);

export default new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    reserves: {
                        merge(existing = [], incoming) {
                            return incoming;
                        }
                    }
                }
            }
        }
    })
});