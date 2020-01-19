import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {BaseScreen} from '../../components';
import theme from '../../general/theme';
import styles from './styles';

const Loading = props => {
  const authToken = useSelector(state => state.general.authToken);

  useEffect(() => {
    props.navigation.navigate(authToken ? 'Logged' : 'Unlogged');
  }, [authToken, props.navigation]);

  return (
    <BaseScreen style={styles.container} scroll={false}>
      <ActivityIndicator size="large" color={theme.secondary} />
    </BaseScreen>
  );
};

export default Loading;
