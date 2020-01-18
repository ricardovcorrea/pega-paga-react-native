import { StyleSheet, Dimensions } from 'react-native';

import theme from '../../general/theme';

const styles = StyleSheet.create({
    baseScreenContainer: {
        padding: 30,
        alignItems: 'center'
    },
    menuContainer: {
        marginTop: 50,
        width: '80%',
        alignItems: 'center'
    },
    menuItem: {
        fontWeight: '500',
        fontSize: 25,
        color: theme.secondary,
        marginBottom: 20
    },
    menuDivider: {
        borderBottomColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1,
        width: '70%',
        marginBottom: 20
    }
});

export default styles;