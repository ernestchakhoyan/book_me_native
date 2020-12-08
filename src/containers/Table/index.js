import React from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { useTranslation } from "react-i18next";

import {
    ListItem,
    SearchBar,
    withTheme
} from "react-native-elements";

import { ReserveActions, Text } from "../../components";

import {
    centered_screen,
    full_width
} from "../../styles/common";
import { metrics } from "../../styles/vars";

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

function Table({ data, theme, updateCallback, deleteCallback }) {
    const [ refreshing, setRefreshing ] = React.useState(false);
    const [ search, setSearch ] = React.useState("");
    const { t } = useTranslation();

    const handleSearch = (text) => {
        setSearch(text);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
            <SafeAreaView style={styles.container}>
                <View>
                    <SearchBar
                        containerStyle={{ ...styles.search_wrapper, backgroundColor: theme.colors.screenBG }}
                        inputContainerStyle={{ backgroundColor: theme.colors.searchBar }}
                        inputStyle={{color: theme.colors.text}}
                        placeholder="Search reserve"
                        onChangeText={handleSearch}
                        value={search}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={styles.scroll_view}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="red"
                            progressBackgroundColor="red"
                        />
                    }
                >
                    {
                        data.map((item, i) => (
                            <ListItem key={i} bottomDivider containerStyle={{backgroundColor: theme.colors.card_bg}}>
                                <ListItem.Content>
                                    <ListItem.Title style={full_width}>
                                            <View style={styles.title}>
                                                <Text h3 style={{flex: 3}}>
                                                    {item.fullName}
                                                </Text>
                                                <View style={styles.status_bar}>
                                                    <Text>Status: </Text>
                                                    <Text>{item.status ? t("busy") : t("free")}</Text>
                                                </View>
                                            </View>
                                    </ListItem.Title>
                                    <ListItem.Subtitle style={styles.sub_title}>
                                        <Text style={styles.label}>Phone number: </Text>
                                        <Text>{item.phoneNumber}</Text>
                                    </ListItem.Subtitle>
                                    <ListItem.Subtitle style={styles.sub_title}>
                                        <Text style={styles.label}>Date: </Text>
                                        <Text>{item.date.toLocaleString()}</Text>
                                    </ListItem.Subtitle>
                                    <ListItem.Subtitle style={styles.sub_title}>
                                        <Text style={styles.label}>Room: </Text>
                                        <Text>{item.seatName}</Text>
                                    </ListItem.Subtitle>
                                    {item.notes ? (
                                        <ListItem.Subtitle style={styles.sub_title}>
                                            <Text style={styles.label}>Note: </Text>
                                            <Text>{item.notes}</Text>
                                        </ListItem.Subtitle>
                                    ): null}
                                </ListItem.Content>
                                <ReserveActions
                                    id={item.id}
                                    seatId={item.seatId}
                                    status={item.status}
                                    statusCallback={updateCallback}
                                    deleteCallback={deleteCallback}
                                />
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginTop: metrics.spacing_md(),
    },
    scroll_view: {
        width: "100%",
    },
    search_wrapper: {
        backgroundColor: "red",
        marginBottom: metrics.spacing_md()
    },
    title: {
        width: "100%",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    },
    status_bar: {
        ...centered_screen,
        alignItems: "flex-start",
        flexDirection: "row",
    },
    sub_title:{
        marginBottom: metrics.spacing
    },
    label:{
        fontWeight: "bold"
    }
});

export default withTheme(Table);