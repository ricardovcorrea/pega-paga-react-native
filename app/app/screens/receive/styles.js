import { StyleSheet, Dimensions } from 'react-native';

import theme from '../../general/theme';

const { height, width } = Dimensions.get('window');
const fontSize = width / 20

const styles = StyleSheet.create({
    baseScreenContainer: {
        paddingHorizontal: width * 0.05,
        justifyContent: 'center'
    }
});

export default styles;