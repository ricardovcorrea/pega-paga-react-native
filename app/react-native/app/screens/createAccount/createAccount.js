/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {TextInput, Button, BaseScreen} from '~/components';
import {validateEmail} from '~/general/helpers';
import {
  login,
  createAccount,
  checkIfEmailExists,
} from '~/services/authenticationService';

import styles from './styles';

const CreateAccountScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  let emailFieldRef = useRef();
  let passwordFieldRef = useRef();
  let confirmPasswordFieldRef = useRef();
  let nameFieldRef = useRef();
  let surnameFieldRef = useRef();

  useEffect(() => {
    if (!email && emailFieldRef) {
      emailFieldRef.focus();
    }
  }, []);

  const emailIsValid = async () => {
    let areValid = true;

    if (!email) {
      setEmailError(' ');
      areValid = false;
    }

    if (email && !validateEmail(email)) {
      setEmailError('This email is invalid!');
      areValid = false;
    }

    if (email && validateEmail(email)) {
      try {
        await checkIfEmailExists(email);
      } catch (error) {
        setEmailError(error.message);
        areValid = false;
      }
    }

    return areValid;
  };

  const inputsAreValid = async () => {
    let areValid = true;

    areValid = await emailIsValid();

    if (!password) {
      setPasswordError('error');
      areValid = false;
    }

    if (!name) {
      setNameError('error');
      areValid = false;
    }

    if (!surname) {
      setSurnameError('error');
      areValid = false;
    }

    return areValid;
  };

  const createAccountButtonHandler = async () => {
    if (isLoading || (await !inputsAreValid())) {
      return;
    }

    try {
      setIsLoading(true);

      await createAccount(email, password, confirmPassword, name, surname);
      await login(email, password);

      setIsLoading(false);

      props.navigation.navigate('Logged');
    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'An error has occured, try again!';

      if (error && error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Warning!', errorMessage);
    }
  };

  return (
    <BaseScreen scroll={true}>
      <Spinner visible={isLoading} />
      <View style={styles.container}>
        <Text style={styles.title}>Enter your data</Text>

        <View style={styles.box}>
          <View>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              value={email}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                passwordFieldRef.focus();
              }}
              ref={input => {
                emailFieldRef = input;
              }}
              placeholder="user@email.com"
              isInvalid={emailError !== ''}
              hilightOnFocus={true}
              style={styles.field}
              onBlur={() => {
                emailIsValid();
              }}
            />
            {emailError !== '' && (
              <Text style={styles.fieldErrorLabel}>{emailError}</Text>
            )}
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              value={password}
              returnKeyType={'next'}
              secureTextEntry={true}
              ref={input => {
                passwordFieldRef = input;
              }}
              onSubmitEditing={() => {
                confirmPasswordFieldRef.focus();
              }}
              placeholder="********"
              isInvalid={passwordError !== ''}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Confirm Password</Text>
            <TextInput
              onChangeText={text => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
              value={confirmPassword}
              returnKeyType={'next'}
              secureTextEntry={true}
              ref={input => {
                confirmPasswordFieldRef = input;
              }}
              onSubmitEditing={() => {
                nameFieldRef.focus();
              }}
              placeholder="********"
              isInvalid={confirmPasswordError !== ''}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              onChangeText={text => {
                setName(text);
                setNameError('');
              }}
              value={name}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                surnameFieldRef.focus();
              }}
              ref={input => {
                nameFieldRef = input;
              }}
              placeholder="Amazing"
              isInvalid={nameError !== ''}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Surname</Text>
            <TextInput
              onChangeText={text => {
                setSurname(text);
                setSurnameError('');
              }}
              value={surname}
              returnKeyType={'done'}
              onSubmitEditing={() => {
                createAccountButtonHandler();
              }}
              ref={input => {
                surnameFieldRef = input;
              }}
              placeholder="User"
              isInvalid={surnameError !== ''}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <Button
            style={styles.btnSave}
            onPress={() => {
              createAccountButtonHandler();
            }}
            title={'CREATE'}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

CreateAccountScreen.navigationOptions = ({navigation}) => ({
  title: 'Creating account',
});

export default CreateAccountScreen;
