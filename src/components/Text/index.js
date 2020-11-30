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
            style={{ color: theme.colors.text, ...style }}
        />
    );
}

export default withTheme(Text);