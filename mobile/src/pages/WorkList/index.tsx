import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import WorkerItem, { Worker } from '../../components/WorkerItem';

function WorkList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [works, setWorks] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedWorkers = JSON.parse(response);
        const favoritedWorkersIds = favoritedWorkers.map((worker: Worker) => {
          return worker.id;
        });

        setFavorites(favoritedWorkersIds);
      }
    });
  }

  useEffect(() => {
    getAllWorks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  function getAllWorks() {
    api.get('works').then((res: any) => setWorks(res.data));
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response: any = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setIsFiltersVisible(false);
    setWorks(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Serviços disponíveis'
        // headerRight={
        //   <BorderlessButton onPress={handleToggleFiltersVisible}>
        //     <Feather name='filter' size={25} color='#FfF' />
        //   </BorderlessButton>
        // }
      >
        <BorderlessButton onPress={handleToggleFiltersVisible}>
          <Feather name='filter' size={25} color='#FfF' />
        </BorderlessButton>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder='Qual a matéria?'
              placeholderTextColor='#c1bccc'
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  value={weekDay}
                  onChangeText={(text) => setWeekDay(text)}
                  style={styles.input}
                  placeholder='Qual o dia?'
                  placeholderTextColor='#c1bccc'
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  style={styles.input}
                  placeholder='Qual horário?'
                  placeholderTextColor='#c1bccc'
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.workList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {works.map((work: Worker) => (
          <WorkerItem
            key={work.id}
            worker={work}
            favorited={favorites.includes(work.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default WorkList;
