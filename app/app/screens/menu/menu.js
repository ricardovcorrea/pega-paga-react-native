import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Animated, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BaseScreen, UserProfileCard } from '../../components';

import { useDispatch, useSelector } from 'react-redux';

import { logoutAction } from '../../redux/generalReducer';

import theme from '../../general/theme';

const MenuScreen = props => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.general.user);

  return (
    <>
      <BaseScreen style={styles.baseScreenContainer}>
        <UserProfileCard user={loggedUser} />
      </BaseScreen>
    </>
  );

}

MenuScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', padding: 10 }}>Pega Paga</Text>
  ),
});

export default MenuScreen;

