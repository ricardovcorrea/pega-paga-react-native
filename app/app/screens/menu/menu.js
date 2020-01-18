import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Linking } from 'react-native';

import styles from './styles';

import { BaseScreen, UserProfileCard, NavBarLogo } from '../../components';

import { useDispatch, useSelector } from 'react-redux';

import { logoutAction } from '../../redux/generalReducer';

const MenuScreen = props => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.general.user);

  const logout = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to leave?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Leave',
          style: 'cancel',
          onPress: () => {
            dispatch(logoutAction());
            props.navigation.navigate('Unlogged');
          }
        }
      ]
    );
  }

  const openGitHub = () => {
    Linking.openURL("https://github.com/ricardovcorrea/pega-paga");
  }

  return (
    <>
      <BaseScreen style={styles.baseScreenContainer}>
        <UserProfileCard user={loggedUser} />

        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.menuItem}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider}></View>
          <TouchableOpacity onPress={openGitHub}>
            <Text style={styles.menuItem}>Project GitHub</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider}></View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>

      </BaseScreen>
    </>
  );

}

MenuScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (NavBarLogo)
});

export default MenuScreen;

