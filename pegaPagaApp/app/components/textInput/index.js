import React, { useState } from 'react';

import {
  TextInput,
  View,
  Text
} from 'react-native';

import styles from './styles';
import theme from '../../general/theme';

import { MaskService } from 'react-native-masked-text';

const TextField = React.forwardRef((props, ref) => {

  const [isOnFocus, setIsOnFocus] = useState(false);

  const getMaskedValue = (value) => {
    if (!value) {
      return "";
    }

    switch (props.mask) {
      case "car-plate": {
        return MaskService.toMask('custom', value.toUpperCase(), { mask: 'AAA-9S99' });
      }
      case "cpf": {
        return MaskService.toMask('cpf', value);
      }
    }
  }

  const onChangeText = (text) => {
    if (props.onChangeText) {
      props.onChangeText(props.mask ? getMaskedValue(text) : text);
    }
  }

  return (
    <View style={props.contentContainerStyle}>
      <TextInput
        keyboardType={props.keyboardType || "default"}
        secureTextEntry={props.secureTextEntry}
        returnKeyType={props.returnKeyType}
        style={[
          styles.inputField,
          props.style,
          isOnFocus ? { borderColor: theme.primary } : { borderColor: '#D1D1D1' },
          !!props.isInvalid ? { borderColor: theme.fieldError } : {},
        ]}
        placeholder={props.placeholder || ""}
        placeholderTextColor={theme.placeholder}
        multiline={!!props.multiline}
        autoCorrect={!!props.autoCorrect}
        numberOfLines={props.numberOfLines || 1}
        autoCapitalize={props.autoCapitalize || "none"}
        onChangeText={onChangeText}
        ref={ref}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={props.blurOnSubmit}
        value={props.mask ? getMaskedValue(props.value) : props.value}
        onFocus={() => { setIsOnFocus(true) }}
        onBlur={() => { setIsOnFocus(false) }}
      >
      </TextInput>
      {props.isInvalid && !props.hideValidationIcon && (
        <>
          <View style={styles.drawCircle} >
            <Text style={styles.textAlert}>!</Text>
          </View>
          {props.invalidMessage != "" && <Text style={styles.errorText}>{props.invalidMessage}</Text>}
        </>
      )}
    </View>
  )
});

export default React.memo(TextField);