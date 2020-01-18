import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Animated, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BaseScreen, BigMoney } from '../../components';

import { useDispatch, useSelector } from 'react-redux';

import { logoutAction } from '../../redux/generalReducer';

import theme from '../../general/theme';

const MainScreen = props => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.general.user);

  useEffect(() => {
    props.navigation.setParams({ logout });
  }, []);

  const logout = () => {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'cancel',
          onPress: () => {
            dispatch(logoutAction());
            props.navigation.navigate('Unlogged');
          }
        }
      ]
    );
  }

  return (
    <>
      <BaseScreen style={styles.baseScreenContainer}>
        <BigMoney title={'Balance'} value={loggedUser.balance} />
      </BaseScreen>
    </>
  );

}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', padding: 10 }}>Pega Paga</Text>
  ),
  headerRight: (
    <TouchableOpacity onPress={() => { navigation.getParam("logout", () => { })() }}>
      <MaterialIcons style={styles.rightButton} name={"directions-run"} size={30} color={theme.secondary} />
    </TouchableOpacity>
  )
});

export default MainScreen;

