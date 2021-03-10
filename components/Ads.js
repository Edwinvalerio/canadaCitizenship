import React, { Component } from "react";
import { View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import { configurations } from "../helpers";

export class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ display: "flex", alignItems: "center" }}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={configurations.ads_banner_id}
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
          testDevices={[AdMobBanner.simulatorId]}
        />
      </View>
    );
  }
}
