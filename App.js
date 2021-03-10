import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import QuestionScreen from "./components/QuestionScreen";
import Home from "./components/Home";
import Progress from "./components/Progress";
import Favorites from "./components/Favorites";
import QuestionList from "./components/QuestionsList";
// import AudioScreen from "./components/AudioScreen";

// import Test from "./components/Test";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {/* <Drawer.Screen name="Test" component={Test} /> */}
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Quiz" component={QuestionScreen} />
        {/* <Drawer.Screen name="Progress" component={Progress} /> */}
        {/* <Drawer.Screen name="Favorites" component={Favorites} /> */}
        <Drawer.Screen name="Questions & Answers" component={QuestionList} />
        {/* <Drawer.Screen name="Audio" component={AudioScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
