import { StyleSheet, Dimensions } from 'react-native';

import theme from '../../general/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    baseScreenContainer: {
        paddingHorizontal: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    readCodeText: {
        position: 'absolute',
        top: 50,
        fontSize: 25,
        color: theme.secondary
    },
    cameraContainer: {
        width: (width - 50),
        height: (width - 50)
    },
    topLeftCorner: { position: 'absolute', top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5, height: 50, width: 50, borderColor: theme.secondary },
    topRightCorner: { position: 'absolute', top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5, height: 50, width: 50, borderColor: theme.secondary },
    bottomLeftCorner: { position: 'absolute', bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5, height: 50, width: 50, borderColor: theme.secondary },
    bottomRightCorner: { position: 'absolute', bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5, height: 50, width: 50, borderColor: theme.secondary },
    confirmPaymentButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        borderRadius: 15,
        height: 80,
        width: '90%',
        padding: 10,
        backgroundColor: theme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    confirmPaymentButtonText: {
        color: theme.primary,
        fontSize: 30,
        fontWeight: '500'
    }

});

export default styles;