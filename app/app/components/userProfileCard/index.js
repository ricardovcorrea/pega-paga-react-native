import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const UserProfileCard = props => {
    const { id, firstName, surName, photo } = props.user;

    return (
        <View style={[styles.container, props.style]}>
            <Image source={{ uri: photo }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.textId}>{id}</Text>
                <Text style={styles.textFirstName}>{firstName},</Text>
                <Text style={styles.textSurName}>{surName}</Text>
            </View>
        </View>
    );
}

export default UserProfileCard;