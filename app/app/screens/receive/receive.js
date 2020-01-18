import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text, Animated, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BaseScreen, NavBarLogo, TextInput } from '../../components';

import { useDispatch, useSelector } from 'react-redux';

import theme from '../../general/theme';

import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

let debounceTimeout = 0;

const ReceiveScreen = props => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.general.user);

  const [amountToReceive, setAmountToReceive] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {

  }, []);

  const setQrCodeDebounced = (nextValue = '') => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {

      let intNextValue = nextValue.replace('R$', '')
      intNextValue = intNextValue.replace(/\./g, '');
      intNextValue = intNextValue.replace(',', '.');

      const qrCodeText = `${loggedUser.id}|${intNextValue * 100}`;

      setQrCode(qrCodeText);
    }, 1000);
  }

  return (
    <>
      <BaseScreen scrollEnabled={true} style={styles.baseScreenContainer}>
        <Text style={styles.screenTitle}>Enter the amount to receive</Text>
        <TextInput
          onChangeText={(text) => { setAmountToReceive(text); setQrCodeDebounced(text) }}
          value={amountToReceive}
          returnKeyType={'next'}
          placeholder="R$00,00"
          mask={'money'}
          textAlign={'center'}
          placeholderTextColor={'white'}
          contentContainerStyle={styles.currencyFieldContainer}
          style={styles.currencyFieldText}
          keyboardType={'numeric'}
          returnKeyType={'done'}
        />
        <QRCode
          style={styles.qrCode}
          size={width - 100}
          value={qrCode || loggedUser.id.toString()}
        />

      </BaseScreen>
    </>
  );

}

ReceiveScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (NavBarLogo)
});

export default ReceiveScreen;

