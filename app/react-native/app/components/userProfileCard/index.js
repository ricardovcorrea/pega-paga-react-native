import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './styles';

const UserProfileCard = props => {
  const {id, firstName, surname, email, photo} = props.user;

  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={{
          uri:
            photo ||
            'https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textId}>ID: {id}</Text>
        <Text style={styles.textFirstName}>
          {`${firstName}, `}
          <Text style={styles.textEmail}>{surname}</Text>
        </Text>
        <Text style={styles.textEmail}>{email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;
