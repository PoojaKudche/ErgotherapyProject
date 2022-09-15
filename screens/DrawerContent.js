import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Drawer,
} from 'react-native-paper';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
import ÜbungsauswahlScreen from './ÜbungsauswahlScreen';
import ProfileScreen from './ProfileScreen';
import FeedbackScreen from './FeedbackScreen';
import PatientMgmtScreen from './PatientMgmtScreen';

export function DrawerContent(props) {

    // const { signOut } = React.useContext(AuthContext);
    // content for signout to be put here
    return (
        <View style={{ flex: 1 }} >
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection} >
                        <DrawerItem
                            name='Übungsauswahl'
                            component={ÜbungsauswahlScreen}
                            label="Übungsauswahl"
                            onPress={() => { props.navigation.navigate('ÜbungsauswahlScreen') }}
                        />
                        <DrawerItem
                            name='Profil'
                            component={ProfileScreen}
                            label="Profil"
                            onPress={() => { props.navigation.navigate('ProfileScreen') }}
                        />
                        <DrawerItem
                            name='Feedback'
                            component={FeedbackScreen}
                            label="Feedback"
                            onPress={() => { props.navigation.navigate('FeedbackScreen') }}
                        />
                        <DrawerItem
                            name='Patientenmanagement'
                            component={PatientMgmtScreen}
                            label="Patientenmanagement"
                            onPress={() => { props.navigation.navigate('PatientMgmtScreen') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app"
                            color={color}
                            size={size} />
                    )}
                    label="Sign Out"
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View >
    )

}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
});