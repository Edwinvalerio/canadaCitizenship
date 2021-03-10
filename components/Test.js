import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { AdMobInterstitial } from "expo-ads-admob";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>This is a test</Text>
      </View>
    );
  }
}
