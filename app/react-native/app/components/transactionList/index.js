/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

import {formatAsCurrency} from '~/general/helpers';
import theme from '~/general/theme';

import styles from './styles';
const {height, width} = Dimensions.get('window');

const TransactionsList = props => {
  const {userId, transactions} = props;
  const [formatedTransactions, setFormatedTransactions] = useState([]);

  useEffect(() => {
    let formatedData = [];

    const dayEnd = moment();

    let todayTransactions = [];
    const todayStart = moment().startOf('day');

    let yesterdayTransactions = [];
    const yesterdayStart = moment()
      .add(-1, 'd')
      .startOf('day');

    let SevenDaysTransactions = [];
    const sevenDaysStart = moment()
      .add(-7, 'd')
      .startOf('day');

    let MonthTransactions = [];
    const monthStart = moment()
      .add(-1, 'M')
      .startOf('day');

    let MoreThanAMonthTransactions = [];
    const moreThanAMonth = moment()
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

    console.log(formatedData);

    setFormatedTransactions(formatedData);
  }, []);

  const testData = [
    {
      type: 'divider',
      props: {
        title: 'Today',
      },
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'divider',
      props: {
        title: 'Yesterday',
        balance: 11000,
      },
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'divider',
      props: {
        title: '7 days',
        balance: 31212,
      },
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'divider',
      props: {
        title: 'Last month',
        balance: 42132,
      },
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
    {
      type: 'transaction',
      transaction: transactions[0],
    },
  ];

  const getStickyToHeaderDividerIndexList = () => {
    const indexsList = formatedTransactions
      .map((data, index) => (data.type === 'divider' ? index : -1))
      .filter(index => index > -1);
    return indexsList;
  };

  const renderTransaction = itemToRender => {
    const {transaction} = itemToRender;
    return (
      <View
        style={{
          padding: 20,
          marginBottom: 15,
          flexDirection: 'row',
          marginHorizontal: 11,
          backgroundColor: theme.secondary,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
          justifyContent: 'space-between',
        }}>
        {transaction.from.id === userId && (
          <Text>{`${transaction.to.firstName} ${transaction.to.surname}`}</Text>
        )}
        {transaction.to.id === userId && (
          <Text>{`${transaction.from.firstName} ${transaction.from.surname}`}</Text>
        )}
        <Text>{`${moment(transaction.datetime).format('DD/MM')} at ${moment(
          transaction.datetime,
        ).format('HH:MM')} `}</Text>

        <View style={{flexDirection: 'row'}}>
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
      <View
        style={{
          padding: 20,
          marginBottom: 15,
          flexDirection: 'row',
          backgroundColor: theme.secondary,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: theme.primary, fontSize: 17, fontWeight: '600'}}>
          {dividerProps.title}
        </Text>
        <Text style={{color: theme.primary, fontSize: 17, fontWeight: '600'}}>
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
      contentContainerStyle={{marginBottom: 20}}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderTopLeftRadius: 15,
      }}
      data={formatedTransactions}
      keyExtractor={(transaction, index) => index.toString()}
      stickyHeaderIndices={getStickyToHeaderDividerIndexList()}
      renderItem={renderTransactionListItem}
    />
  );
};

export default TransactionsList;
