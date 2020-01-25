/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, Dimensions, ActivityIndicator, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';

import {BaseScreen, NavBarLogo, TextInput} from '~/components';
import {useDebounce} from '~/general/hooks';
import {
  addReceiveMessageListener,
  removeReceiveMessageListener,
} from '~/general/socket';
import {refreshLoggedUserInfo} from '~/services/userService';

import theme from '../../general/theme';
import styles from './styles';

const {width} = Dimensions.get('window');
let socketMessageListener = 0;

const ReceiveScreen = props => {
  const loggedUser = useSelector(state => state.general.user);

  const [amountToReceive, setAmountToReceive] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isReceivingPayment, setIsReceivingPayment] = useState(false);
  const [paymentReceivedFromUser, setPaymentReceivedFromUser] = useState();
  const debouncedQrCode = useDebounce(qrCode, 1000);

  useEffect(() => {
    socketMessageListener = addReceiveMessageListener(
      onReceiveMessageFromSocket,
    );
    return () => {
      removeReceiveMessageListener(socketMessageListener);
    };
  }, []);

  const onReceiveMessageFromSocket = async (to, payload) => {
    if (to === loggedUser.id && payload.type === 'pay') {
      setIsReceivingPayment(true);
      await refreshLoggedUserInfo();
      setTimeout(() => {
        setPaymentReceivedFromUser(payload.from);
        setTimeout(() => {
          setQrCode(loggedUser.id);
          setAmountToReceive(0);
          setIsReceivingPayment(false);
          setPaymentReceivedFromUser(null);
        }, 1000);
      }, 1000);
    }
  };

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
      {!isReceivingPayment && (
        <QRCode
          style={styles.qrCode}
          size={width - 100}
          value={debouncedQrCode || loggedUser.id.toString()}
        />
      )}
      {isReceivingPayment && (
        <View
          style={{
            width: width - 100,
            height: width - 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!paymentReceivedFromUser && (
            <>
              <ActivityIndicator color={theme.secondary} size={'large'} />
              <Text
                style={{color: theme.secondary, fontSize: 25, marginTop: 20}}>
                Receiving payment ...
              </Text>
            </>
          )}
          {paymentReceivedFromUser && (
            <>
              <Text
                style={{color: theme.secondary, fontSize: 25, marginTop: 20}}>
                Payment receive from
              </Text>
              <Text
                style={{color: theme.secondary, fontSize: 25, marginTop: 20}}>
                {`${paymentReceivedFromUser.firstName} ${paymentReceivedFromUser.surname}`}
              </Text>
            </>
          )}
        </View>
      )}
    </BaseScreen>
  );
};

ReceiveScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default ReceiveScreen;
