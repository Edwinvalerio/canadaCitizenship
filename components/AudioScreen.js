import React, { Component } from "react";
import { Button, View, ImageBackground } from "react-native";
import { background_image } from "../helpers";
// import sound

export default class AudioScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={background_image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderWidth: 5 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0,0.8)", resizeMode: "cover", padding: 10, height: "100%" }}>
          <Button onPress={navigation.openDrawer} title="Menu" />
        </View>
      </ImageBackground>
    );
  }
}
