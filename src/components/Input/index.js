import React from "react";
import {
    Input,
    withTheme
} from "react-native-elements";

function CustomInput(props) {
    const { theme } = props;
    return (
        <Input
            inputStyle={{
                color: theme.colors.text
            }}
            {...props}
        />
    );
}

export default withTheme(CustomInput);