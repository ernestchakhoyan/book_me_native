import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { useMutation } from "@apollo/client";
import {
    Button,
    Icon,
    Input,
    withTheme
} from "react-native-elements";

import { Context as AuthContext} from "../context/AuthContext";

import { Text } from "../components";
import ScreenWrapper from "../containers/ScreenWrapper";

import { LOGIN } from "../graphql/mutations/authorization";
import { setItemToStorage } from "../services/storage";

import { centered_screen } from "../styles/common";
import { metrics } from "../styles/vars";
import colors from "../theme/colors";

function Login({ navigation,theme }) {
    const {signin} = React.useContext(AuthContext);
    const [ loading, setLoading ] = React.useState(false);
    const [ username, setUsername ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ error, setError ] = React.useState("");

    const [ login ] = useMutation(LOGIN, {
        ignoreResults: true
    });

    const resetError = () => {
        setError("");
    };

    const handleLogin = async() => {
        resetError();
        setLoading(true);
        try {
            const { data } = await login({
                variables: {
                    username,
                    password
                }
            });

            const { token } = data.login;
            await setItemToStorage("access_token", token);
            signin(token);
            setLoading(false);

            navigation.navigate("Home_");
        }catch (e){
            console.log(e);
            setLoading(false);
            setError("Wrong username or password")
        }
    };

    return (
        <ScreenWrapper customStyles={{ ...styles.container }}>
            <View style={styles.header}>
                <Text h1 style={{ color: theme.colors.primary }}>
                    Login
                </Text>
                <Text style={styles.subtitle}>
                    as administrator
                </Text>
            </View>

            <View style={styles.content}>
                <Input
                    placeholder='Username'
                    onChangeText={text => setUsername(text)}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='user'
                            type="font-awesome"
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    errorMessage={error}
                    onChangeText={text => setPassword(text)}
                    leftIcon={
                        <Icon
                            name='lock'
                            type="font-awesome-5"
                            size={24}
                            color={theme.colors.text}
                        />
                    }
                />
                <Button
                    style={{ ...styles.button, color: colors.light }}
                    title="Login"
                    loading={loading}
                    onPress={handleLogin}
                />
            </View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...centered_screen
    },
    subtitle: {
        fontSize: 16
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: metrics.spacing_lg()
    },
    button: {
        padding: metrics.spacing_md(),
        width: 120
    }
});

export default withTheme(Login);