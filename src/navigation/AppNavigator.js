import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MiniPlayerBar from '../components/MiniPlayerBar';
import FullPlayerModal from '../components/FullPlayerModal';
import { colors, typography } from '../theme/theme';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          tabBar={(props) => (
            <View style={styles.customTabBarContainer}>
              <MiniPlayerBar />
              <BottomTabBar {...props} />
            </View>
          )}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: [
              styles.tabBar,
              {
                height: 56 + (insets.bottom > 0 ? insets.bottom : 8),
                paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
              },
            ],
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, focused }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Explore') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Library') {
                iconName = focused ? 'library' : 'library-outline';
              } else if (route.name === 'Premium') {
                iconName = focused ? 'sparkles' : 'sparkles-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={22} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Explore" component={SearchScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Premium" component={PremiumScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

        {/* Full Screen Player Modal */}
        <FullPlayerModal />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  customTabBarContainer: {
    backgroundColor: colors.tabBarBackground,
  },
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default AppNavigator;
