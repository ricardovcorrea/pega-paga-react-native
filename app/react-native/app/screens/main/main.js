/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react';
import {Alert, View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  BaseScreen,
  BigMoney,
  NavBarLogo,
  UserProfileCard,
} from '~/components/index';
import {initializeSocket} from '~/general/socket';
import {logoutAction} from '~/redux/generalReducer';

import styles from './styles';
import theme from '../../general/theme';

const MainScreen = props => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.general.user);

  useEffect(() => {
    props.navigation.setParams({logout});
    initializeSocket();
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
    <BaseScreen style={styles.baseScreenContainer} stickyHeaderIndices={[1]}>
      <UserProfileCard user={loggedUser} />
      <View style={{backgroundColor: theme.primary, paddingTop: 20}}>
        <BigMoney title={'Balance'} value={loggedUser.balance} />
        <Text
          style={{
            fontSize: 25,
            color: theme.secondary,
            marginTop: 20,
            marginBottom: 10,
          }}>
          Transactions
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 70}}
        style={{flex: 1}}
        data={loggedUser.transactions}
        keyExtractor={transaction => transaction.id.toString()}
        renderItem={item => {
          const transaction = item.item;
          return (
            <View
              style={{
                backgroundColor: 'red',
                padding: 15,
                marginBottom: 5,
                flexDirection: 'row',
              }}>
              {transaction.from.id === loggedUser.id && <Text>-</Text>}
              {transaction.to.id === loggedUser.id && <Text>+</Text>}
              <Text>{transaction.amount / 100}</Text>
            </View>
          );
        }}
      />
    </BaseScreen>
  );
};

MainScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default MainScreen;
