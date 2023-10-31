import * as React from 'react';
// import * as Analytics from 'expo-firebase-analytics';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ColorSchemeName, View } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import { CustomDefaultTheme, CustomDarkTheme } from '../style/themes';

// DRAWER
// import DrawerContent from '../components/drawer/drawerContent';

// SCREENS
import MapScreen from '../screens/map/mapScreen';
import TestScreen from '../screens/test/testScreen';
import MessagesScreen from '../screens/messages/messagesScreen';
import MessageReadScreen from '../screens/messages/messageReadScreen';
import MyEventsScreen from '../screens/events/myEventsScreen';
import ProfileScreen from '../screens/profile/profileScreen';
import ListViewScreen from '../screens/listView/listViewScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import PrimaryDrawer from '../components/drawer/primaryDrawer';
import LoginScreen from '../screens/authentication/loginScreen';
import RegisterScreen from '../screens/authentication/registerScreen';
import CreateEventForm1 from '../screens/events/createEventForm1';
import CreateEventForm2 from '../screens/events/createEventForm2';
import CreateEventForm3 from '../screens/events/createEventForm3';
import FriendList from '../screens/friends/friendList';
import CreateEventForm4 from '../screens/events/createEventForm4';
import EditAddressScreen from '../screens/events/editAddress';
import CreateInterestsScreen from '../screens/interests/createInterestsScreen';
import PlacesScreen from '../screens/places/placesScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    // const navigationRef: any = useNavigationContainerRef();
    // const routeNameRef: any = React.useRef();
    return (
        <NavigationContainer
            // ref={navigationRef}
            // onReady={() => {
            //     routeNameRef.current = navigationRef.getCurrentRoute().name;
            // }}
            // onStateChange={async () => {
            //     const previousRouteName = routeNameRef.current;
            //     const currentRouteName = navigationRef.getCurrentRoute().name;

            //     if (previousRouteName !== currentRouteName) {
            //         await Analytics.setCurrentScreen(currentRouteName);
            //     }

            //     // Save the current route name for later comparison
            //     routeNameRef.current = currentRouteName;
            // }}
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
        >
            <DrawerNavigator />
        </NavigationContainer>
    );
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props: any) => <PrimaryDrawer {...props} />} screenOptions={{ drawerPosition: 'right', drawerStyle: { width: '80%' } }}>
            {/* <Drawer.Screen name="CreateEventScreen" component={CreateEventScreen} options={{ headerShown: false }} /> */}
            <Drawer.Screen name="RootNavigator" component={RootNavigator} options={{ headerShown: false, swipeEnabled: false }} />
        </Drawer.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <BottomSheetModalProvider>
            <Stack.Navigator>
                {/* <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MessageReadScreen" component={MessageReadScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ListViewScreen" component={ListViewScreen} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, animation: 'fade' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false, animation: 'fade' }} />
                <Stack.Screen name="CreateEventForm1" component={CreateEventForm1} options={{ headerShown: false, animation: 'fade' }} />
                <Stack.Screen name="CreateEventForm2" component={CreateEventForm2} options={{ headerShown: false }} />
                <Stack.Screen name="CreateEventForm3" component={CreateEventForm3} options={{ headerShown: false }} />
                <Stack.Screen name="CreateEventForm4" component={CreateEventForm4} options={{ headerShown: false }} />
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="FriendList" component={FriendList} options={{ headerShown: false }} />
                    <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateInterestsScreen" component={CreateInterestsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="PlacesScreen" component={PlacesScreen} options={{ headerShown: false }} />
                </Stack.Group>
            </Stack.Navigator>
        </BottomSheetModalProvider>
    );
}
