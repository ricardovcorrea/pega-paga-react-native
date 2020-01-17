import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Animated, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BaseScreen } from '../../components';

import { useDispatch } from 'react-redux';

import { logoutAction } from '../../redux/generalReducer';

import theme from '../../general/theme';

const Main = props => {
  const dispatch = useDispatch();

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
      </BaseScreen>
    </>
  );

}

Main.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => { navigation.getParam("logout", () => { })() }}>
      <MaterialIcons style={styles.rightButton} name={"directions-run"} size={30} color={theme.secondary} />
    </TouchableOpacity>
  )
});

export default Main;

