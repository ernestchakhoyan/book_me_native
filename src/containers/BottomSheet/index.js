import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import { BottomSheet } from "react-native-btr";

function Sheet({ visible, toggleCallback }) {
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={toggleCallback}
            onBackdropPress={toggleCallback}
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