import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Alert, Text, TouchableOpacity, Platform } from "react-native";
import { getRandomOssorGloss } from "./helpers/randomOss";

export default function App() {
    const Separator = () => <View style={styles.separator} />;
    const [displayed, setDisplayed] = React.useState(getRandomOssorGloss());
    const [score, setScore] = React.useState(0);
    const [backgroundColor, setBackgroundColor] = React.useState("#fff");
    const [lives, setLives] = React.useState(3);

    const checkerOnPress = ({ type }, buttonPressed) => {
        if (type === buttonPressed) {
            setScore(score + 1);
            setBackgroundColor("#16c115");
        } else {
            setBackgroundColor("#c11515");
            setLives(lives - 1);
        }

        if (lives === 1) {
            Platform.OS === "web" ? console.log("did a thing") : Alert.alert("Game Over", `Your score is ${score}`);
            setScore(0);
            setLives(3);
            setBackgroundColor("#fff");
        }

        setDisplayed(getRandomOssorGloss());
    };
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
            <View style={{ flex: 3, width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>{displayed.name}</Text>
            </View>
            <View style={{ flex: 4 }}>
                <View style={{ flex: 0.1, alignItems: "center", flexDirection: "column", marginBottom: 10 }}>
                    <Text style={{ fontSize: 26 }}>{`Score: ${score} `}</Text>
                    <Text style={{ fontSize: 26 }}>{`Lives: ${lives} `}</Text>
                </View>
                <Separator />
                <View style={styles.buttonStyling}>
                    <TouchableOpacity style={styles.iosButton} onPress={() => checkerOnPress(displayed, "Horse")}>
                        <Text style={styles.buttonFont}> 'OSS </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iosButton} onPress={() => checkerOnPress(displayed, "Gloss")}>
                        <Text style={styles.buttonFont}> GLOSS </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonStyling: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: "#737373",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    iosButton: {
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6666",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6666",
        margin: 5,
    },
    buttonFont: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
