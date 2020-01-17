import React, { useEffect } from 'react';

import { ActivityIndicator } from 'react-native';

import theme from '../../general/theme';

import { BaseScreen } from '../../components';

import styles from './styles';

import { useSelector } from 'react-redux';

const Loading = props => {
  const authToken = useSelector(state => state.general.authToken);

  useEffect(() => {
    props.navigation.navigate(authToken ? 'Logged' : 'Unlogged');
  }, []);

  return (
    <BaseScreen style={styles.container} scroll={false}>
      <ActivityIndicator size='large' color={theme.secondary} />
    </BaseScreen>
  );
}

export default Loading;

