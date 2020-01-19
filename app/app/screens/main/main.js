/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {BaseScreen, BigMoney, NavBarLogo} from '../../components';
import {logoutAction} from '../../redux/generalReducer';
import styles from './styles';

const MainScreen = props => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.general.user);

  useEffect(() => {
    props.navigation.setParams({logout});
  }, []);

  const logout = () => {
    Alert.alert('Atenção', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'cancel',
        onPress: () => {
          dispatch(logoutAction());
          props.navigation.navigate('Unlogged');
        },
      },
    ]);
  };

  return (
    <>
      <BaseScreen style={styles.baseScreenContainer}>
        <BigMoney title={'Balance'} value={loggedUser.balance} />
      </BaseScreen>
    </>
  );
};

MainScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default MainScreen;
