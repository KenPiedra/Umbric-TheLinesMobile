//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomDrawerContentScreen from "../../screens/DrawerMenus/CustomDrawerContent";
import BettingGuideStatesScreen from "../../screens/DrawerMenus/BettingGuideStates";
import NBAScreen from "./NBAScreen";
import NFLScreen from "./NFLScreen";
import MLBScreen from "./MLB";

// create a component
const DrawMain = () => {
  const [index, setindex] = useState(0);
  return (
    <View style={styles.container}>
      {index == 0 && (
        <CustomDrawerContentScreen handleClick={(i: number) => setindex(i)} />
      )}
      {index == 1 && <NBAScreen handleBack={() => setindex(0)} />}
      {index == 2 && <NFLScreen handleBack={() => setindex(0)} />}
      {index == 3 && <MLBScreen handleBack={() => setindex(0)} />}
      {index == 6 && (
        <BettingGuideStatesScreen handleBack={() => setindex(0)} />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default DrawMain;
