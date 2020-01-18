import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Animated, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BaseScreen } from '../../components';

import { useDispatch } from 'react-redux';

import theme from '../../general/theme';

import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const ReceiveScreen = props => {
  const dispatch = useDispatch();

  return (
    <>
      <BaseScreen style={styles.baseScreenContainer}>

        <QRCode
          style={styles.qrCode}
          size={width - 50}
          value="30,13212"
        />

      </BaseScreen>
    </>
  );

}

ReceiveScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => { navigation.getParam("logout", () => { })() }}>
      <MaterialIcons style={styles.rightButton} name={"directions-run"} size={30} color={theme.secondary} />
    </TouchableOpacity>
  )
});

export default ReceiveScreen;

