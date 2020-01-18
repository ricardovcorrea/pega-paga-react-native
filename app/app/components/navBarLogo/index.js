import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    }
});

const NavBarLogo = props => {
    return (
        <Text style={styles.logo}>Pega Paga</Text>
    )
}

export default NavBarLogo;