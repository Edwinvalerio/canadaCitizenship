import React from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";

import { LineChart, ProgressChart, ContributionGraph } from "react-native-chart-kit";

export default function Chart({ navigation }) {
  return (
    <View>
      <ScrollView>
        <Text style={progressStyles.minTitle}>Passing Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [Math.random() * 100, Math.random() * 100 - 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          //   yAxisLabel="$"
          //   yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#5a8f53",
            backgroundGradientTo: "#63cf55",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text style={progressStyles.minTitle}>Practicing Days </Text>

        <ContributionGraph values={commitsData} endDate={new Date("2017-04-01")} numDays={105} height={220} chartConfig={chartConfig} />

        {/* <Text style={progressStyles.minTitle}>Today's Progress </Text> */}
        {/* <ProgressChart data={data} width={Dimensions.get("window").width} height={220} strokeWidth={16} radius={32} chartConfig={chartConfig} hideLegend={false} /> */}
      </ScrollView>
    </View>
  );
}

const progressStyles = {
  minTitle: {
    fontSize: 20,
    color: "white",
  },
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const commitsData = [
  { date: "2017-01-02", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-04", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-03-01", count: 2 },
  { date: "2017-04-02", count: 4 },
  { date: "2017-03-05", count: 2 },
  { date: "2017-02-30", count: 4 },
];
const data = {
  labels: ["Passed", "Fail", "Ratial"], // optional
  data: [0.4, 0.6, 0.8],
};
