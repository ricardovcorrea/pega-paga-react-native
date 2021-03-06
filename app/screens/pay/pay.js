/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {View, Alert, Text, ActivityIndicator} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BaseScreen, NavBarLogo} from '~/components';
import theme from '~/general/theme';
import {getPublicUserInfo} from '~/services/userService';

import styles from './styles';

const PayScreen = props => {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [codeReaded, setCodeReaded] = useState(false);

  props.navigation.addListener('didBlur', () => {
    setIsCameraActive(false);
  });

  props.navigation.addListener('didFocus', () => {
    setIsCameraActive(true);
  });

  const onBarCodeRead = async read => {
    if (!codeReaded) {
      try {
        setCodeReaded(true);

        const [userId, value] = read.data.split('|');

        if (!userId) {
          throw 'This code is invalid!';
        }

        if (!value || value === '0') {
          throw 'The transaction must have a value greater than R$00,00';
        }
        const userInfo = await getPublicUserInfo(userId);
        if (!userInfo) {
          throw 'User not found!';
        }

        props.navigation.navigate('ConfirmPayment', {userInfo, value});

        setCodeReaded(false);
      } catch (error) {
        Alert.alert(
          'Warning',
          error || 'An problem occured trying read the code, please try again!',
          [
            {
              text: 'OK',
              onPress: () => {
                setCodeReaded(false);
              },
            },
          ],
        );
      }
    }
  };

  return (
    <BaseScreen scrollEnabled={false} style={styles.baseScreenContainer}>
      {!codeReaded && (
        <Text style={styles.readCodeText}>Position the code to read</Text>
      )}
      {codeReaded && (
        <Text style={styles.readCodeText}>Getting user info ...</Text>
      )}
      {isCameraActive && (
        <RNCamera style={styles.cameraContainer} onBarCodeRead={onBarCodeRead}>
          <View style={styles.topLeftCorner} />
          <View style={styles.topRightCorner} />
          <View style={styles.bottomLeftCorner} />
          <View style={styles.bottomRightCorner} />
        </RNCamera>
      )}
    </BaseScreen>
  );
};

PayScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default PayScreen;
