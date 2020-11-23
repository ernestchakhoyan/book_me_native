import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import { BottomSheet } from "react-native-btr";

function Sheet(props) {
    const [visible, setVisible] = React.useState(true);

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    }

    return (
        <BottomSheet
            visible={visible}

            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}
        >
            <View style={styles.bottomNavigationView}>
                <Text>Hello</Text>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Sheet;