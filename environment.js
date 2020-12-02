import Constants from "expo-constants";

const ENV = {
    dev: {
        API_URL: "https://book-me-server.herokuapp.com/graphql", //"http://localhost:4000/graphql",
        WS_URL: "wss://book-me-server.herokuapp.com/graphql " //ws://localhost:4000/graphql"
    },
    prod: {
        API_URL: "https://book-me-server.herokuapp.com/graphql",
        WS_URL: "wss://book-me-server.herokuapp.com/graphql"
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev;
    } else if (env === "prod") {
        return ENV.prod;
    }
};

export default getEnvVars;