import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Dimensions, Text } from 'react-native';

import styles from './styles';

import { BaseScreen, NavBarLogo } from '../../components';

import { useDispatch } from 'react-redux';

import { RNCamera } from 'react-native-camera';

import { getUserInfo } from '../../services/userService';

const PayScreen = props => {
  const dispatch = useDispatch();

  const [isCameraActive, setIsCameraActive] = useState(true);
  const [codeReaded, setCodeReaded] = useState(false);

  props.navigation.addListener('didBlur', () => {
    setIsCameraActive(false);
  });

  props.navigation.addListener('didFocus', () => {
    setIsCameraActive(true);
  });

  const onBarCodeRead = async (read) => {
    if (!codeReaded) {
      try {
        setCodeReaded(true);

        const [userId, value] = read.data.split('|');

        if (!userId) {
          throw "This code is invalid!";
        }

        if (!value || value == '0') {
          throw "The transaction must have a value greater than R$00,00";
        }

        const userInfo = await getUserInfo(userId);
        if (!userInfo) {
          throw "User not found!";
        }

        setCodeReaded(false);

        props.navigation.navigate('ConfirmPayment', { userInfo, value });

      } catch (error) {
        Alert.alert('Warning', error || "An problem occured trying read the code, please try again!", [
          {
            text: 'OK',
            onPress: () => {
              setCodeReaded(false);
            }
          }
        ])
      }
    }
  }

  return (
    <>
      <BaseScreen scrollEnabled={false} style={styles.baseScreenContainer}>
        <Text style={styles.readCodeText}>Position the code to read</Text>
        {isCameraActive &&
          <RNCamera style={styles.cameraContainer} onBarCodeRead={onBarCodeRead}>
            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />
          </RNCamera>
        }
      </BaseScreen>
    </>
  );

}

PayScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (NavBarLogo)
});

export default PayScreen;

