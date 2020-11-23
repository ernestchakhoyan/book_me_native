import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

function About(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "red" }}>
            <Text>About screen</Text>
            <Text>This is new p</Text>
        </View>
    );}

const styles = StyleSheet.create({});

export default About;