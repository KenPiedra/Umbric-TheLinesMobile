import * as React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


function CustomDrawerContent(props: any) {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <View style={styles.menuActions}>
          <TouchableOpacity>
            <Icon name="close" style={styles.menuItemIcon} size={32} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuAvatar}>
          <Image source={{uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}} style={styles.menuAvatarImage} />
          <View style={styles.menuAvatarText}>
            <Text style={styles.menuAvatarName}>Justin Smith</Text>
            <Text style={styles.menuAvatarEdit}>Edit Profile</Text>
          </View>
        </View>

        <View style={[styles.menuGroup, { paddingTop: 32 }]}>
          <Text style={styles.menuTitle}>Quick Menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>NBA</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>NFL</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <Text style={styles.menuTitle}>Main Menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Odds')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>All Odds</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Sportsbooks')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Sportsbooks</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HowToBet')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>How to Bet</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>US State Guides</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>News</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Podcast</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: '#2CAF4D' }]}>Log out</Text>
              <Icon name="chevron-right" style={styles.menuItemIcon} size={24} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 16,
  },
  menuActions: {
    padding: 8,
    alignItems: 'flex-end',
  },
  menuAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#7B8794',
  },
  menuAvatarImage: {
    width: 56,
    height: 56,
    borderRadius: 56,
  },
  menuAvatarText: {
    paddingHorizontal: 16,
  },
  menuAvatarName: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff',
  },
  menuAvatarEdit: {
    fontSize: 14,
    lineHeight: 22,
    color: '#2CAF4D',
  },
  menuGroup: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#7B8794',
  },
  menuTitle: {
    color: '#7B8794',
    fontSize: 12,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "600",
  },
  menuItemIcon: {
    color: '#7B8794',
  }
});

export default CustomDrawerContent;