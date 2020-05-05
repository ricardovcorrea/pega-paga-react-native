/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import {formatAsCurrency} from '~/general/helpers';

import styles from './styles';

const TransactionsList = props => {
  const {userId} = props;
  const [formatedTransactions, setFormatedTransactions] = useState([]);

  useEffect(() => {
    formatTransactionsData();
  }, [props.transactions]);

  const formatTransactionsData = () => {
    if (!props.transactions || !props.transactions.length) {
      return;
    }

    let formatedData = [];

    let todayTransactions = [];
    const todayStart = moment().startOf('day');

    let yesterdayTransactions = [];
    const yesterdayStart = moment()
      .add(-1, 'd')
      .startOf('day');

    let sevenDaysTransactions = [];
    const sevenDaysStart = moment()
      .add(-7, 'd')
      .startOf('day');

    let allOtherTransacions = [];
    const allOtherTransacionsStart = moment()
      .add(-10, 'Y')
      .startOf('day');

    todayTransactions = props.transactions.filter(
      transaction => moment(transaction.datetime) >= todayStart,
    );

    yesterdayTransactions = props.transactions.filter(
      transaction =>
        moment(transaction.datetime) >= yesterdayStart &&
        moment(transaction.datetime) < todayStart,
    );

    sevenDaysTransactions = props.transactions.filter(
      transaction =>
        moment(transaction.datetime) >= sevenDaysStart &&
        moment(transaction.datetime) < yesterdayStart,
    );

    allOtherTransacions = props.transactions.filter(
      transaction =>
        moment(transaction.datetime) >= allOtherTransacionsStart &&
        moment(transaction.datetime) < sevenDaysStart,
    );

    if (todayTransactions.length) {
      formatedData.push({
        type: 'divider',
        props: {
          title: 'Today',
        },
      });

      formatedData = [
        ...formatedData,
        ...todayTransactions.map(transaction => ({
          type: 'transaction',
          transaction,
        })),
      ];
    }

    if (yesterdayTransactions.length) {
      formatedData.push({
        type: 'divider',
        props: {
          title: 'Yesterday',
        },
      });

      formatedData = [
        ...formatedData,
        ...yesterdayTransactions.map(transaction => ({
          type: 'transaction',
          transaction,
        })),
      ];
    }

    if (sevenDaysTransactions.length) {
      formatedData.push({
        type: 'divider',
        props: {
          title: 'Week',
        },
      });

      formatedData = [
        ...formatedData,
        ...sevenDaysTransactions.map(transaction => ({
          type: 'transaction',
          transaction,
        })),
      ];
    }

    if (allOtherTransacions.length) {
      formatedData.push({
        type: 'divider',
        props: {
          title: 'All other',
        },
      });

      formatedData = [
        ...formatedData,
        ...allOtherTransacions.map(transaction => ({
          type: 'transaction',
          transaction,
        })),
      ];
    }

    setFormatedTransactions(formatedData);
  };

  const getStickyToHeaderDividerIndexList = () => {
    const indexsList = formatedTransactions
      .map((data, index) => (data.type === 'divider' ? index : -1))
      .filter(index => index > -1);
    return indexsList;
  };

  const renderTransaction = itemToRender => {
    const {transaction} = itemToRender;
    return (
      <View style={styles.transactionItemContainer}>
        {transaction.from.id === userId && (
          <Text>{`${transaction.to.firstName} ${transaction.to.surname}`}</Text>
        )}
        {transaction.to.id === userId && (
          <Text>{`${transaction.from.firstName} ${transaction.from.surname}`}</Text>
        )}
        <Text>{`${moment(transaction.datetime).format('DD/MM')} at ${moment(
          transaction.datetime,
        ).format('HH:MM')} `}</Text>

        <View style={styles.transactionItemAmountContainer}>
          {transaction.from.id === userId && <Text>-</Text>}
          {transaction.to.id === userId && <Text>+</Text>}
          <Text>{formatAsCurrency(transaction.amount / 100)}</Text>
        </View>
      </View>
    );
  };

  const renderDivider = itemToRender => {
    const dividerProps = itemToRender.props;

    return (
      <View style={styles.transactionItemDivider}>
        <Text style={styles.transactionItemDividerText}>
          {dividerProps.title}
        </Text>
        <Text style={styles.transactionItemDividerText}>
          {dividerProps.balance && formatAsCurrency(dividerProps.balance / 100)}
        </Text>
      </View>
    );
  };

  const renderTransactionListItem = item => {
    const itemToRender = item.item;
    if (itemToRender.type === 'transaction') {
      return renderTransaction(itemToRender);
    }
    if (itemToRender.type === 'divider') {
      return renderDivider(itemToRender);
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.transactionListContainer}
      style={styles.transactionList}
      data={formatedTransactions}
      keyExtractor={(transaction, index) => index.toString()}
      stickyHeaderIndices={getStickyToHeaderDividerIndexList()}
      renderItem={renderTransactionListItem}
    />
  );
};

export default TransactionsList;
