import React from "react";
import { Text, Button, View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { background_image } from "../helpers";
import Ads from "./Ads";

// const addData = async (data) => {
//   let dataString = JSON.stringify(data);
//   try {
//     await AsyncStorage.setItem("favorite", dataString);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeItemValue = async (key) => {
//   try {
//     await AsyncStorage.removeItem(key);
//     return true;
//   } catch (exception) {
//     return false;
//   }
// };

// const getData = async () => {
//   try {
//     let value = await AsyncStorage.getItem("favorite");
//     if (value !== null) {
//       value = JSON.parse(value);
//       console.log(value);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// const clearStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     alert("Storage successfully cleared!");
//   } catch (e) {
//     alert("Failed to clear the async storage.");
//   }
// };
// // addData(test);
// // clearStorage();

export default class Favorites extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderWidth: 5 }}>
        <View style={{ backgroundColor: "rgba(0, 0, 0,0.8)", resizeMode: "cover", padding: 10, height: "100%" }}>
          <Text style={myStyle.header}>Favorites</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Text style={{ color: "white", fontSize: 20 }}>Total Favorites</Text>
            <Text style={{ color: "white", fontSize: 20 }}>{favorites_data.length}</Text>
          </View>

          <ScrollView style={{ maxHeight: "80%" }}>
            <Ads />
            {favorites_data.map((item, index) => (
              <View key={index} style={{ textAlign: "left", marginTop: 15, backgroundColor: "rgba(255,255,255,.2)", borderRadius: 5, padding: 10 }}>
                <Text style={{ color: "white", fontWeight: "500", fontSize: 20 }}>{item.question}</Text>
                <Text style={{ color: "#64dfdf", fontWeight: "500" }}>{item.correnctAnswer}</Text>
                <TouchableOpacity style={{ backgroundColor: "#2849F2", marginTop: 15 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>Delete Item</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Button onPress={navigation.openDrawer} title="Menu" />
          {/* <Button onPress={() => navigation.navigate("Questions")} title="Start Quiz" /> */}
        </View>
      </ImageBackground>
    );
  }
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

const favorites_data = [
  {
    id: 60,
    question: "What is the purpose of the 10th Amendment? ",
    answers: ["Republic", "Republic", "Constitution-based federal republic", "Representative democracy"],
    correnctAnswer: "Republic",
  },
  {
    id: 61,
    question: "Who is the governor of your state now?* ",
    answers: ["Republic", "Republic", "Constitution-based federal republic", "Representative democracy"],
    correnctAnswer: "Republic",
  },
];
