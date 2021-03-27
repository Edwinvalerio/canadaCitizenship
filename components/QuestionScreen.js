import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, ImageBackground, Alert, ScrollView, Image } from "react-native";
import * as Speech from "expo-speech";

import { requestTrackingPermission } from "react-native-tracking-transparency";

// import sound
import { Audio } from "expo-av";
// Haptics Engine
import * as Haptics from "expo-haptics";

import AnswerCard from "./AnswerCard";

import { generateQuestions, configurations, background_image } from "../helpers";

// ADS
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import { Banner } from "./Ads";

const question_seen = {};
const answers_letters = ["A", "B", "C", "D"];
const answers_letters_color = ["#EEBA37", "#53CBEB", "#9EE165", "#EF6D6B"];

// DECLARE Sound
// const right_sound = new Sound("../assets/sounds/right.mp3", Sound.MAIN_BUNDLE, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    // binding

    this.addQuestion = this.addQuestion.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.reStartQuiz = this.reStartQuiz.bind(this);
    this.playSound = this.playSound.bind(this);
    this.speak = this.speak.bind(this);

    this.state = {
      answered: false,
      question_list: [],
      asnwer_track: [],
    };
  }

  // GENERATE QUESTION IF THE LIST IS EMPTY
  async componentDidMount() {
    try {
      const trackingStatus = await requestTrackingPermission();
      if (trackingStatus === "authorized" || trackingStatus === "unavailable") {
        // enable tracking features
      }
    } catch (error) {}

    try {
      await AdMobInterstitial.setAdUnitID(configurations.ads_Interstitial_id); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });

      // show ads on compoenet load
      // const randomNumber = Math.floor(Math.random() * 100) + 1;
      // const randomTime = Math.floor(Math.random() * 15000) + 5000;
      // if (configurations.ads_Interstitial_show_percentage > randomNumber) {
      //   setTimeout(() => {
      //     AdMobInterstitial.showAdAsync();
      //   }, randomTime);
      // }
    } catch (error) {
      console.log(error);
    }
    if (!this.state.question_list.length) {
      this.addQuestion(generateQuestions());
    }
    // trey again just in case didnt work
    if (!this.state.question_list.length) {
      this.addQuestion(generateQuestions());
    }
  }

  addQuestion(item) {
    // console.log(item.id);
    // STOP TALKING IN CASE THE PREV QUESTION WAS LONG AS F*k
    Speech.stop();
    // this.playSound("next");
    const randomAnswers = shuffleArray(item.answers);
    if (!question_seen[item.id]) {
      this.setState({
        question_list: [
          ...this.state.question_list,
          {
            id: item.id,
            question: item.question,
            answers: randomAnswers,
            correnctAnswer: item.correnctAnswer,
            image: item.image || "",
          },
        ],
        answered: false,
      });
      question_seen[item.id] = true;
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    // Speech.speak(item.question);
  }

  async reStartQuiz() {
    // RUN BIG ADS 10% PERCENT OF THE TIME
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (configurations.ads_Interstitial_show_percentage > randomNumber) {
      AdMobInterstitial.showAdAsync();
      // Display a rewarded ads
      // await AdMobRewarded.setAdUnitID(configurations.adUnitIDRewardedInterstitial); // Test ID, Replace with your-admob-unit-id
      // await AdMobRewarded.requestAdAsync();
      // await AdMobRewarded.showAdAsync();
    }
    this.setState({
      asnwer_track: [],
      question_list: [generateQuestions()],
      answered: false,
    });
  }

  async playSound(soundFileName = "pass") {
    // const { sound } = await Audio.Sound.createAsync(require("../assets/sounds/right.mp3"));
    const pass = (await Audio.Sound.createAsync(require(`../assets/sounds/pass.mp3`))).sound;
    const pafailss = (await Audio.Sound.createAsync(require(`../assets/sounds/fail.mp3`))).sound;
    const correct = (await Audio.Sound.createAsync(require(`../assets/sounds/correct.mp3`))).sound;
    const wrong = (await Audio.Sound.createAsync(require(`../assets/sounds/wrong.mp3`))).sound;
    const next = (await Audio.Sound.createAsync(require(`../assets/sounds/next.mp3`))).sound;

    switch (soundFileName) {
      case "pass":
        await pass.playAsync();
        break;
      case "fail":
        await pafailss.playAsync();
        break;
      case "correct":
        await correct.playAsync();
        break;
      case "wrong":
        await wrong.playAsync();
        break;
      case "next":
        await next.playAsync();
        break;
      default:
        break;
    }
  }

  speak(params) {
    Speech.stop();
    Speech.speak(params);
  }
  validateAnswer(answer) {
    this.setState({
      answered: true,
    });
    const correct_answer = this.state.question_list[this.state.question_list.length - 1].correnctAnswer || null;
    // IF ANSWER IS CORRECT
    if (correct_answer == answer) {
      this.setState({
        asnwer_track: [...this.state.asnwer_track, { icon: "", isCorrect: true }],
      });
      // right_sound.play((success) => {
      //   if (success) {
      //     console.log("successfully finished playing");
      //   } else {
      //     console.log("playback failed due to audio decoding errors");
      //   }
      // });
      this.playSound("correct");
    } else {
      // ANSWER IS INCORRECT
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      // this.playSound("wrong");
      this.setState({
        asnwer_track: [...this.state.asnwer_track, { icon: "", isCorrect: false }],
      });
    }
  }

  render() {
    // set local storage with favorites
    // Display an interstitial

    // IF THERES NO QUESTION IN THE STATCE GENERATE ONE AND ADD IT

    // check if the quiz is completed

    const { navigation } = this.props;
    const question = this.state.question_list.length ? this.state.question_list[this.state.question_list.length - 1].question : "";
    const last_question = this.state.question_list.length ? this.state.question_list[this.state.question_list.length - 1] : "";
    const correnctAnswer = this.state.question_list.length ? this.state.question_list[this.state.question_list.length - 1].correnctAnswer : "";
    const image = { uri: "https://images.pexels.com/photos/4669109/pexels-photo-4669109.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" };
    const total_wrong_answer = this.state.asnwer_track.filter((item) => item.isCorrect == false).length;
    const total_correct_answer = this.state.asnwer_track.filter((item) => item.isCorrect == true).length;
    // check if the user pass the test
    if (this.state.asnwer_track.length == configurations.total_questions) {
      const score = Math.floor((total_correct_answer / configurations.total_questions) * 100);
      if (score > configurations.passing_percentage) {
        this.playSound("pass");
        Alert.alert(
          "✅ Congratulations 😊!! ✅",
          `You have passed with ${score}%`,
          [
            {
              text: "Restart Quiz",
              onPress: () => this.reStartQuiz(),
            },
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            // { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      } else {
        this.playSound("fail");

        Alert.alert(
          "❌❌ Test Complete ❌❌",
          `Oh no!! you failed the test with score of ${score}%, You need at least 70% to pass. \nYou go ${total_correct_answer} out of ${configurations.total_questions} questions correct.`,
          [
            {
              text: "Restart Quiz",
              onPress: () => this.reStartQuiz(),
            },
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            // { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      }
    }

    if (this.state.question_list.length) {
      return (
        <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
          <View style={{ backgroundColor: "rgba(0,0,0,.5)", minHeight: "100%", display: "flex", paddingTop: 50, flex: 1 }}>
            <Banner />
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5 }}>
              <TouchableOpacity onPress={navigation.openDrawer} style={{ marginLeft: "5%" }}>
                <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
                <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
                <View style={{ width: 50, height: 10, backgroundColor: "white", margin: 2, borderRadius: 5 }}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.speak(question)}>
                <Text style={{ fontSize: 55 }}>🔊</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => this.addFavorite(last_question)}>
                <Text style={{ fontSize: 50 }}>⭐</Text>
              </TouchableOpacity> */}
            </View>

            <View style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", margin: 5 }}>
              {/* QUESTION  */}
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500", color: "white" }}>{question || ""}</Text>
              {/* QUESTION  */}

              <View style={{ display: "flex", flexDirection: "row", padding: 5, backgroundColor: "rgba(0,0,0,.5)", borderRadius: 5 }}>
                <Text style={{ color: "white", fontSize: 15 }}>
                  Question {this.state.asnwer_track.length} of {configurations.total_questions}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flex: 3, marginBottom: 5 }}>
                <ScrollView persistentScrollbar={true} style={{ display: "flex", marginTop: 3, overflow: "hidden" }}>
                  <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {this.state.question_list[this.state.question_list.length - 1].image ? (
                      <Image
                        style={{ resizeMode: "contain", justifyContent: "center", width: 200, height: 200 }}
                        source={{
                          uri: this.state.question_list[this.state.question_list.length - 1].image,
                        }}
                      />
                    ) : null}

                    {this.state.question_list[this.state.question_list.length - 1].answers.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => this.validateAnswer(item)} disabled={this.state.answered}>
                        <AnswerCard
                          answer={item}
                          isRed={item == correnctAnswer}
                          letter={answers_letters[index]}
                          answerColor={answers_letters_color[index]}
                          isAnswered={this.state.answered}
                          isCorrectAnswer={item == this.state.question_list[this.state.question_list.length - 1].correnctAnswer}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View style={{ flex: 0.5, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                  style={{
                    width: 200,
                    height: 50,
                    margin: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: this.state.asnwer_track.length ? "#F6837E" : "#c4c4c4",
                    borderRadius: 10,
                    justifyContent: "center",
                    disabled: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.reStartQuiz()}
                  disabled={!this.state.asnwer_track.length}
                >
                  <Text style={{ fontSize: 21, fontWeight: "bold", color: "white" }}>RESTART</Text>
                </TouchableOpacity>

                {this.state.answered ? (
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
                    onPress={() => this.addQuestion(generateQuestions())}
                    disabled={!this.state.answered}
                  >
                    <Text style={{ fontSize: 21, fontWeight: "bold", color: "#707070" }}>NEXT</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
          <View style={{ backgroundColor: "rgba(0, 0, 0,0.7)", minHeight: "100%", display: "flex", paddingTop: 50, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 100, color: "white", fontWeight: "100" }}>Loading..</Text>
            {/* <Button title="START" onPress={() => this.addQuestion(generateQuestions())} /> */}
            <Button onPress={navigation.openDrawer} title="Menu" />

            {/* <Button onPress={() => navigation.navigate("Notifications")} title="Go to notifications" /> */}
          </View>
        </ImageBackground>
      );
    }
  }
}

export default QuestionScreen;

/* <Button onPress={navigation.openDrawer} title="Main Menu" /> */
/* <Button onPress={() => navigation.navigate("Notifications")} title="Go to notifications" /> */
