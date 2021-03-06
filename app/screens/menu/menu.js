import React from 'react';
import {View, TouchableOpacity, Alert, Text, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {BaseScreen, NavBarLogo, UserProfileCard} from '~/components/index';
import {logoutAction} from '~/redux/generalReducer';

import styles from './styles';

const MenuScreen = props => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.general.user);

  const logout = () => {
    Alert.alert('Warning', 'Are you sure you want to leave?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Leave',
        style: 'cancel',
        onPress: () => {
          dispatch(logoutAction());
          props.navigation.navigate('Unlogged');
        },
      },
    ]);
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/ricardovcorrea/pega-paga');
  };

  return (
    <BaseScreen style={styles.baseScreenContainer}>
      <UserProfileCard user={loggedUser} />
      <View style={styles.menuContainer}>
        <View style={styles.menuDivider} />
        <TouchableOpacity onPress={openGitHub}>
          <Text style={styles.menuItem}>Project GitHub</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity onPress={logout}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
      </View>
    </BaseScreen>
  );
};

MenuScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default MenuScreen;
