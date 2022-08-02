import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  NavigationContainerRef,
  DefaultTheme,
} from '@react-navigation/native';
import { HomeScreen } from '../screens/home/index';
import { InfoScreen } from '../screens/info/index';
import { BcvFeesScreen } from '../screens/bcvFees/index';
//Context
import { AppDataContext, routes } from '../context/appData.context';
import { TouchableOpacity, View, Keyboard, StyleSheet } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';
import { Icon, HStack } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { DrawerNavigationT } from './components/drawer';

export type AppDrawerParamList = {
  Home: undefined;
  BcvFees: undefined;
  Info: undefined;
};

interface propsDrawer {
  navigation?: any;
  routeFromBackground: 'BcvFees' | 'Home' | undefined;
  appProps: any;
}

const navigationRef: React.RefObject<NavigationContainerRef<any>> =
  React.createRef();

const navTheme = DefaultTheme;
navTheme.colors.background = '#222222';

const CopilotView = walkthroughable(View);

const Drawer = createDrawerNavigator<AppDrawerParamList>();
export function AppDrawer(prevProps: propsDrawer) {
  const {
    shareCapture,
    actTodayBcv,
    sharedTodayBcv,
    getAllData,
    setNavigationRef,
    setActualScreenF,
  } = React.useContext(AppDataContext);

  if (navigationRef) {
    setNavigationRef(navigationRef);
  }
  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#00a818',
        }}
        drawerContent={props => (
          <DrawerNavigationT
            {...props}
            {...prevProps}
            routeFromBackground={prevProps.routeFromBackground}
          />
        )}
        screenListeners={{
          focus: () => {
            if (
              navigationRef &&
              navigationRef.current &&
              navigationRef.current.getCurrentRoute()
            ) {
              setActualScreenF(
                navigationRef.current.getCurrentRoute()!.name as routes,
              );
            }
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerRight: () => (
              <HStack
                style={{
                  alignSelf: 'flex-end',
                  // marginTop: 20,
                  paddingHorizontal: 15,
                }}>
                <TouchableOpacity onPress={async () => await getAllData()}>
                  {/* @ts-ignore */}
                  <CopilotStep
                    order={1}
                    active={true}
                    text="Botón de refrescar"
                    name="Botón de refrescar">
                    <CopilotView>
                      <Icon
                        as={FontAwesome}
                        name="redo-alt"
                        size={17}
                        style={styles.iconRefreshHome}
                        // onPress={() => actToday()}
                      />
                    </CopilotView>
                  </CopilotStep>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    shareCapture();
                    Keyboard.dismiss();
                  }}>
                  <Icon
                    as={FontAwesome}
                    name="share-alt"
                    size={17}
                    style={styles.iconItemHeader}
                    // onPress={() => {
                    //   sharedToday(value);
                    // }}
                  />
                </TouchableOpacity>
              </HStack>
            ),
          }}
        />
        <Drawer.Screen
          name="BcvFees"
          component={BcvFeesScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerRight: () => (
              <HStack
                style={{
                  alignSelf: 'flex-end',
                  // marginTop: 20,
                  paddingHorizontal: 15,
                }}>
                <TouchableOpacity onPress={() => actTodayBcv()}>
                  <Icon
                    as={FontAwesome}
                    name="redo-alt"
                    size={17}
                    style={styles.iconRefreshHome}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    sharedTodayBcv();
                    Keyboard.dismiss();
                  }}>
                  <Icon
                    as={FontAwesome}
                    name="share-alt"
                    size={17}
                    style={styles.iconItemHeader}
                    // onPress={() => sharedTodayBcv()}
                  />
                </TouchableOpacity>
              </HStack>
            ),
          }}
        />
        <Drawer.Screen
          name="Info"
          component={InfoScreen}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconRefreshHome: {
    color: 'white',
    textAlign: 'center',
    marginRight: 10,
  },

  iconItemHeader: {
    color: 'white',
    marginHorizontal: 5,
  },
  headerContainer: {
    marginTop: 10,
  },
});
