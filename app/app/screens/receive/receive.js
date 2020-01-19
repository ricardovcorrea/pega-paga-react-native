import React, {useState, useEffect} from 'react';
import {Text, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';

import {BaseScreen, NavBarLogo, TextInput} from '../../components';
import styles from './styles';

const {width} = Dimensions.get('window');

let debounceTimeout = 0;

const ReceiveScreen = props => {
  const loggedUser = useSelector(state => state.general.user);

  const [amountToReceive, setAmountToReceive] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {}, []);

  const setQrCodeDebounced = (nextValue = '') => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      let intNextValue = nextValue.replace('R$', '');
      intNextValue = intNextValue.replace(/\./g, '');
      intNextValue = intNextValue.replace(',', '.');

      const qrCodeText = `${loggedUser.id}|${intNextValue * 100}`;

      setQrCode(qrCodeText);
    }, 1000);
  };

  return (
    <>
      <BaseScreen scrollEnabled={true} style={styles.baseScreenContainer}>
        <Text style={styles.screenTitle}>Enter the amount to receive</Text>
        <TextInput
          onChangeText={text => {
            setAmountToReceive(text);
            setQrCodeDebounced(text);
          }}
          value={amountToReceive}
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
};

ReceiveScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default ReceiveScreen;
