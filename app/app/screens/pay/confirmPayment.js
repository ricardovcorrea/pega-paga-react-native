import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

import styles from './styles';

import { BaseScreen, UserProfileCard, BigMoney } from '../../components';

import { useDispatch } from 'react-redux';

import theme from '../../general/theme';

const ConfirmPaymentScreen = props => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [amountToPay, setAmountToPay] = useState(0);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    getRouteParameters();
  }, []);

  const getRouteParameters = async () => {
    const user = await props.navigation.getParam("userInfo");
    setUserInfo(user);

    const value = await props.navigation.getParam("value");
    setAmountToPay(value);
  }

  const confirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      props.navigation.pop();
      props.navigation.navigate('Main');
    }, 500)
  }

  return (
    <>
      <BaseScreen scrollEnabled={false} style={{ padding: 30 }}>

        <UserProfileCard user={userInfo} style={{ marginBottom: 80 }} />

        <BigMoney title={'Amount to Pay'} value={amountToPay} />

        <TouchableOpacity onPress={confirmPayment} style={styles.confirmPaymentButton}>
          {!isProcessingPayment && <Text style={styles.confirmPaymentButtonText}>Confirm payment</Text>}
          {isProcessingPayment && <ActivityIndicator size='small' color={theme.primary} />}
        </TouchableOpacity>


      </BaseScreen>
    </>
  );

}

ConfirmPaymentScreen.navigationOptions = ({ navigation }) => ({
  title: 'Confirmação'
});

export default ConfirmPaymentScreen;

