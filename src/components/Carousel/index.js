import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from "react-native";
import { Image } from "react-native-elements";
import { metrics } from "../../styles/vars";

const { width } = Dimensions.get('window');
const height = width * 0.5;

function Carousel({ images }) {
    if (images && !images.length) {
        return null
    }
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
            >
                {images.map((image) => (
                    <Image key={image} style={styles.image} source={{ uri: image }} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: metrics.spacing_md(),
        paddingBottom: metrics.spacing_md(),
        backgroundColor: "#000",
    },
    image: {
        width: width,
        height,
    }
});

export default Carousel;