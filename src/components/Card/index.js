import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Text from "../Text";
import colors from "../../theme/colors";

function CustomCard(props) {
    const { title, customStyles, children, titleStyles } = props;
    return (
        <Card
            containerStyle={{
                ...styles.container,
                ...customStyles
            }}
        >
            <Text style={titleStyles}>{title}</Text>
            <Card.Divider />
            {children}
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.appDarkBG
    }
});

export default CustomCard;