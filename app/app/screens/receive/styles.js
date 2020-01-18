import { StyleSheet, Dimensions } from 'react-native';

import theme from '../../general/theme';

const { height, width } = Dimensions.get('window');

const fontSize = width * 0.12;

const styles = StyleSheet.create({
    baseScreenContainer: {
        paddingHorizontal: width * 0.05,
        paddingTop: 50,
        alignItems: 'center'
    },
    screenTitle: {
        fontSize: 25,
        color: theme.secondary,
        marginBottom: 30
    },
    currencyFieldContainer: {
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: theme.secondary,
        marginBottom: 50, width: '100%'
    },
    currencyFieldText: {
        borderWidth: 0,
        color: theme.secondary,
        fontSize: fontSize,
        fontWeight: '900'
    },
});

export default styles;