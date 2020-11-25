import React from 'react';
import {StyleSheet} from 'react-native';
import { Header } from "react-native-elements";

function AppHeader(props) {
    const {toggleBottomSheet, scene} = props;
    const {route, descriptor} = scene;
    const {navigation} = descriptor;

    const handleDrawerToggle = () => {
        navigation.toggleDrawer();
    }

    return (
     <Header
         placement="left"
         leftComponent={{ icon: 'menu', color: '#fff', onPress:handleDrawerToggle }}
         centerComponent={{ text: route.name, style: { color: '#fff' } }}
         rightComponent={{ icon: 'home', color: '#fff', onPress:toggleBottomSheet }}
     />
 );}

const styles = StyleSheet.create({});

export default AppHeader;