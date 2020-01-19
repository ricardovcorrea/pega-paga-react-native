import React from 'react';
import {View, Text} from 'react-native';

import {formatAsCurrency} from '../../general/helpers';
import styles from './styles';

const BigMoney = ({title, value}) => {
  const formatedValue = formatAsCurrency(value / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{formatedValue}</Text>
    </View>
  );
};

export default BigMoney;
