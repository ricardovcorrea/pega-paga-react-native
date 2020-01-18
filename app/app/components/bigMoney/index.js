import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const BigMoney = ({ title, value }) => {
    const formatedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text adjustsFontSizeToFit style={styles.value}>{formatedValue}</Text>
        </View>
    );
}

export default BigMoney;