/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {BaseScreen} from '~/components/index';
import {initializeSocket} from '~/general/socket';
import theme from '~/general/theme';
import {refreshLoggedUserInfo} from '~/services/userService';

import styles from './styles';
const Loading = props => {
  const authToken = useSelector(state => state.general.authToken);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    if (authToken) {
      try {
        await refreshLoggedUserInfo();
        props.navigation.navigate('Logged');

        initializeSocket();
      } catch (error) {
        props.navigation.navigate('Unlogged');
      }
    } else {
      props.navigation.navigate('Unlogged');
    }
  };

  return (
    <BaseScreen style={styles.container} scroll={false}>
      <ActivityIndicator size="large" color={theme.secondary} />
    </BaseScreen>
  );
};

export default Loading;
