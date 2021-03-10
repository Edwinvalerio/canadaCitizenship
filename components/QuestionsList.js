import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, ImageBackground, ScrollView, Image } from "react-native";
import { background_image } from "../helpers";
import AllQuestions from "../all_questions";
import { Banner } from "./Ads";
export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderWidth: 5 }}>
        <View style={{ backgroundColor: "rgba(0, 0, 0,0.8)", resizeMode: "cover", padding: 10, height: "100%" }}>
          <Text style={myStyle.header}>Questions & Answers</Text>
          <Banner />
          <ScrollView style={{ maxHeight: "80%" }}>
            {AllQuestions.map((item, index) => (
              <View style={myStyle.questionCard} key={index}>
                <Text style={myStyle.question}>{item.question}</Text>
                <Text style={myStyle.correnctAnswer}>{item.correnctAnswer}</Text>
                {item.image ? (
                  <Image
                    style={{ resizeMode: "contain", justifyContent: "center", width: 200, height: 200 }}
                    source={{
                      uri: item.image,
                    }}
                  />
                ) : null}
              </View>
            ))}
          </ScrollView>

          {/* <Button onPress={() => navigation.navigate("Questions")} title="Start Quiz" /> */}
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              onPress={navigation.openDrawer}
            >
              <Text style={{ fontSize: 21, fontWeight: "bold", color: "#707070" }}>MENU</Text>
            </TouchableOpacity>
          </View>
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
  question: {
    color: "white",
    fontSize: 20,
  },
  correnctAnswer: {
    color: "#94ffa8",
    fontSize: 15,
  },
  questionCard: {
    backgroundColor: "rgba(255,255,255,.3)",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
};
