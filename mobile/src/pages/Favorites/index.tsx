import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import WorkerItem, { Worker } from '../../components/WorkerItem';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response: any) => {
      if (response) {
        const favoritedWorkers = JSON.parse(response);

        setFavorites(favoritedWorkers);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title='Meus favoritos' />

      <ScrollView
        style={styles.workList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((worker: Worker) => {
          return <WorkerItem key={worker.id} worker={worker} favorited />;
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
