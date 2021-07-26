import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from './Themed';


export default function HamburgerIcon (props: any) {

  const navigation = useNavigation();

  function _openDrawer() {
    console.log("clicked hamburger icon. =>", props.navigation);
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <TouchableHighlight onPress={() => _openDrawer()}>
      <View style={styles.icon}>
        <Ionicons name="ios-reorder-three" size={24} color="#fff" />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {

  }
});
