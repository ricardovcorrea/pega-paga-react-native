/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ActivityIndicator, Text, Alert} from 'react-native';

import {BaseScreen, UserProfileCard, BigMoney} from '~/components';
import theme from '~/general/theme';
import {pay} from '~/services/transactionService';
import {refreshLoggedUserInfo} from '~/services/userService';

import styles from './styles';

const ConfirmPaymentScreen = props => {
  const [userInfo, setUserInfo] = useState({});
  const [amountToPay, setAmountToPay] = useState(0);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    getRouteParameters();
  }, []);

  const getRouteParameters = async () => {
    const user = await props.navigation.getParam('userInfo');
    setUserInfo(user);

    const value = await props.navigation.getParam('value');
    setAmountToPay(value);
  };

  const confirmPayment = async () => {
    try {
      setIsProcessingPayment(true);

      await pay(userInfo.id, amountToPay);
      await refreshLoggedUserInfo();

      setIsProcessingPayment(false);

      props.navigation.pop();
      props.navigation.navigate('Main');
    } catch (error) {
      setIsProcessingPayment(false);
      let errorMessage = 'An error has occured, try again!';

      if (error && error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Warning!', errorMessage);
    }
  };

  return (
    <BaseScreen scrollEnabled={false} style={styles.container}>
      <UserProfileCard user={userInfo} style={styles.userInfoCard} />

      <BigMoney title={'Amount to Pay'} value={amountToPay} />

      <TouchableOpacity
        onPress={confirmPayment}
        style={styles.confirmPaymentButton}>
        {!isProcessingPayment && (
          <Text style={styles.confirmPaymentButtonText}>Confirm payment</Text>
        )}
        {isProcessingPayment && (
          <ActivityIndicator size="small" color={theme.primary} />
        )}
      </TouchableOpacity>
    </BaseScreen>
  );
};

ConfirmPaymentScreen.navigationOptions = ({navigation}) => ({
  title: 'Confirmação',
});

export default ConfirmPaymentScreen;
