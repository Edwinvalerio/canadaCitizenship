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

          <Text style={myStyle.paragraph}>
            Before we begin, it is important to note that, like with many other things in the US, different states have different rules for driving and transportation. And while most of the
            regulations and procedures are usually similar, they are not universal. Therefore, for state-specific information
          </Text>

          <Text style={myStyle.paragraph}>
            Learner's permit allows you to operate a vehicle while supervised at all times by an adult in the front seat at least 21 years of age who is licensed and has at least one year of driving
            experience. According to Junior Operator License (JOL) requirements permit holders under the age of 18 may not drive between 12 a.m. (midnight) and 5 a.m. unless accompanied by their
            parent or legal guardian (licensed operator with at least one year of driving experience whose license is valid).
          </Text>

          <Text style={myStyle.paragraph}>You must verify Your lawful presence Social Security Number Massachusetts residency (1 document for a Standard permit, 2 for a REAL ID permit)</Text>
          <Text style={myStyle.paragraph}>
            Your parent, guardian, Department of Children and Families, or boarding school headmaster must sign your application. If the person giving consent is not your parent, you must provide
            proper documentation. You don’t have to get written consent if you are married or legally emancipated.
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
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    padding: 15,
  },
});
