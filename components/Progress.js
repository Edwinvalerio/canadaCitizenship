import React from "react";
import { Text, Button, View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { background_image } from "../helpers";
import Chart from "./Chart";
import { Banner } from "./Ads";

export default function Progress({ navigation }) {
  return (
    <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderWidth: 5 }}>
      <View style={{ backgroundColor: "rgba(0, 0, 0,0.8)", resizeMode: "cover", padding: 10, height: "100%" }}>
        <Text style={myStyle.header}>Progress</Text>
        <TouchableOpacity onPress={navigation.openDrawer} style={{ marginLeft: "5%" }}>
          <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
          <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
          <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
        </TouchableOpacity>
        <ScrollView>
          <Banner />
          <Chart />
          {/* <Button onPress={() => navigation.navigate("Questions")} title="Start Quiz" /> */}
        </ScrollView>
        <Button onPress={navigation.openDrawer} title="Menu" />
      </View>
    </ImageBackground>
  );
}

const myStyle = {
  paragraph: {
    fontSize: 15,
    paddingBottom: 10,
    color: "white",
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    padding: 10,
    marginTop: 25,
  },
};
