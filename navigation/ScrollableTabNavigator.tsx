import * as React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ColorValue,
  TextStyle,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { View, Text, ViewProps } from "../components/Themed";
import {
  ScrollableTabView,
  ScrollableTabBar,
} from "react-native-scrollable-tab-view-ts";

export class NavigationTabBar extends ScrollableTabBar {
  constructor(props: any) {
    super(props);
  }
  renderTab = (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: Function,
    onLayoutHandler: any
  ) => {
    const { activeTextColor, inactiveTextColor, textStyle, renderTab } =
      this.props;
    if (renderTab) {
      renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler);
    }

    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const borderStyle = {
      borderColor: activeTextColor,
      borderBottomWidth: isTabActive ? 4 : 1,
      height: isTabActive ? 48 : 46,
    };

    return (
      <TouchableWithoutFeedback
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tab, this.props.tabStyle, borderStyle]}>
          <Text style={[{ color: textColor }, textStyle]}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

interface ScrollableTabViewProps extends ViewProps {
  tabBarPosition?: "top" | "bottom" | "overlayTop" | "overlayBottom";
  initialPage?: number;
  page?: number;
  onChangeTab?: ({
    i,
    ref,
    from,
  }: {
    i: number;
    ref: any;
    from: number;
  }) => void;
  onScroll?: (offsetX: number) => void;
  renderTabBar?: any;
  tabBarUnderlineStyle?: ViewStyle;
  tabBarBackgroundColor?: ColorValue;
  tabBarActiveTextColor?: ColorValue;
  tabBarInactiveTextColor?: ColorValue;
  tabBarTextStyle?: TextStyle;
  style?: ViewStyle;
  contentProps?: object;
  scrollWithoutAnimation?: boolean;
  locked?: boolean;
  prerenderingSiblingsNumber?: number;
  children?: any;
}

export default function ScrollableTabNavigator(props: ScrollableTabViewProps) {
  const colorScheme = useColorScheme();

  return (
    <ScrollableTabView
      initialPage={0}
      tabBarActiveTextColor={Colors[colorScheme].text}
      tabBarInactiveTextColor={Colors[colorScheme].inactive}
      tabBarTextStyle={styles.tabbartext}
      tabBarUnderlineStyle={styles.tabbarUnderline}
      renderTabBar={() => <NavigationTabBar />}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabbartext: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabbarUnderline: {
    height: 0,
  },
  tabview: {
    margin: "auto",
  },
});
