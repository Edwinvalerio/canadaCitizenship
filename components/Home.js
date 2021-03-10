import React from "react";
import { Text, Button, View, ImageBackground, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getCurrentDate, background_image } from "../helpers";
import { Banner } from "./Ads";

// translate this page to users preferences
export default function questions({ navigation }) {
  return (
    <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderWidth: 5 }}>
      <View style={{ backgroundColor: "rgba(0, 0, 0,0.8)", resizeMode: "cover", padding: 10, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Banner />
        <ScrollView style={{ maxHeight: "80%" }}>
          <Text style={myStyle.header}>Ready to Pass Your Test??</Text>
          {/* <View style={{ padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../assets/images/license.png")} style={{ width: 300, height: 200, padding: 30 }} />
          </View> */}

          <Text style={myStyle.paragraph}>{"\u2B24"} be a permanent resident</Text>
          <Text style={myStyle.paragraph}>{"\u2B24"} have lived in Canada for 3 out of the last 5 years</Text>
          <Text style={myStyle.paragraph}>{"\u2B24"} have filed your taxes, if you need to</Text>
          <Text style={myStyle.paragraph}>{"\u2B24"} pass a citizenship test</Text>
          <Text style={myStyle.paragraph}>{"\u2B24"} prove your language skills</Text>

          <Text style={myStyle.paragraph}>
            If you’re 18 to 54 years of age on the day you sign your application, you need to take the citizenship test. You’ll need to answer questions about the rights and responsibilities of
            Canadians and Canada’s:
          </Text>

          <Text style={myStyle.paragraph}>{getCurrentDate()}</Text>
          {/* <Button onPress={() => navigation.navigate("Quiz")} title="Start Quiz" /> */}
        </ScrollView>

        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            margin: "auto",
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 10,
            justifyContent: "center",
            disabled: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // onPress={navigation.openDrawer}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Text style={{ fontSize: 21, fontWeight: "bold", color: "#707070" }}>START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const myStyle = StyleSheet.create({
  paragraph: {
    fontSize: 15,
    paddingBottom: 10,
    color: "white",
    // textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    padding: 15,
  },
});
