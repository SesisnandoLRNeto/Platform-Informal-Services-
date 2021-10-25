import React from 'react';
import { View, ImageBackground, Text, Linking } from 'react-native';
import Constants from 'expo-constants';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

function Public() {
  const { goBack } = useNavigation();

  const { debuggerHost } = Constants.manifest;

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode='contain'
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser publicar seu trampo?</Text>
        <Text style={styles.description}>
          Vá agora e se cadastre como servidor informal na nossa plataforma web.
        </Text>
        <Text
          style={{ color: 'blue' }}
          onPress={() =>
            Linking.openURL(
              debuggerHost
                ? `http://${debuggerHost.split(':').shift()}:3001`
                : ''
            )
          }
        >
          Acesse este Link
        </Text>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default Public;
