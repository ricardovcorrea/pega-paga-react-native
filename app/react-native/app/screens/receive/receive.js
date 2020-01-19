import React, {useState} from 'react';
import {Text, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';

import {BaseScreen, NavBarLogo, TextInput} from '~/components';
import {useDebounce} from '~/general/hooks';

import styles from './styles';

const {width} = Dimensions.get('window');

const ReceiveScreen = props => {
  const loggedUser = useSelector(state => state.general.user);

  const [amountToReceive, setAmountToReceive] = useState('');
  const [qrCode, setQrCode] = useState('');
  const debouncedQrCode = useDebounce(qrCode, 1000);

  const generateAndSetQrCode = (nextValue = '') => {
    let intNextValue = nextValue.replace('R$', '');
    intNextValue = intNextValue.replace(/\./g, '');
    intNextValue = intNextValue.replace(',', '.');

    setQrCode(`${loggedUser.id}|${intNextValue * 100}`);
  };

  return (
    <BaseScreen scrollEnabled={true} style={styles.baseScreenContainer}>
      <Text style={styles.screenTitle}>Enter the amount to receive</Text>
      <TextInput
        onChangeText={text => {
          setAmountToReceive(text);
          generateAndSetQrCode(text);
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
        value={debouncedQrCode || loggedUser.id.toString()}
      />
    </BaseScreen>
  );
};

ReceiveScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default ReceiveScreen;
