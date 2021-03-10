import React, { Component } from "react";
import { View, Text } from "react-native";

class AnswerCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 3,
          padding: 5,
          minWidth: "90%",
          maxWidth: "90%",
          minHeight: 70,
          borderRadius: "5px",
          backgroundColor: this.props.isCorrectAnswer && this.props.isAnswered ? "green" : !this.props.isCorrectAnswer && this.props.isAnswered ? "rgba(255, 51, 51, .2)" : "white",
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <View
          style={{
            borderRadius: "100%",
            backgroundColor: !this.props.isCorrectAnswer && this.props.isAnswered ? "rgba(255, 51, 51, .1)" : this.props.answerColor,
            display: "flex",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>{!this.props.letter ? "A" : this.props.letter}</Text>
        </View>
        <View style={{ maxWidth: "90%", minWidth: "90%" }}>
          <Text
            style={{
              textAlign: "center",
              padding: 5,
              color: this.props.isCorrectAnswer && this.props.isAnswered ? "white" : "#575757",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {this.props.answer}
          </Text>
        </View>
      </View>
    );
  }
}

export default AnswerCard;
