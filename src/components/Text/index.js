import React from "react";
import {
    Text as RNEText,
    withTheme
} from "react-native-elements";

function Text(props) {
    const { theme, style } = props;
    return (
        <RNEText
            {...props}
            style={{ ...style, color: theme.colors.text }}
        />
    );
}

export default withTheme(Text);