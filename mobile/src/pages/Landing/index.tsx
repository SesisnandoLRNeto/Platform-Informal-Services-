import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { useMediaQuery } from 'react-responsive';

import landingImg from '../../assets/images/landing.png';
import find from '../../assets/images/icons/find.png';
import work from '../../assets/images/icons/work.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';
import styles from './styles';

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnections, settotalConnections] = useState(0);

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 300,
  });

  useEffect(() => {
    api.get('connections').then((response: any) => {
      const { total } = response.data;
      settotalConnections(total);
    });
  }, []);

  function handleNavigateToPublicPage() {
    navigate('Public');
  }

  function handleNavigateToTabsPages() {
    navigate('Tabs');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      {isTabletOrMobileDevice ? (
        <Text style={{ fontSize: 1 }}>MeuTrampo</Text>
      ) : (
        <Text style={styles.titleApp}>MeuTrampo</Text>
      )}
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToTabsPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image style={styles.image} source={find} />

          <Text style={styles.buttonText}>Encontrar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToPublicPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image style={styles.image} source={work} />

          <Text style={styles.buttonText}>Publicar</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
