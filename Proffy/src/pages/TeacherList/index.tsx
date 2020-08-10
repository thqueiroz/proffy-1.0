/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {View, ScrollView, Text, TextInput, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TheacherItem, {Teacher} from '../../components/TheacherItem';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  async function loadFavorites(): Promise<void> {
    const response = await AsyncStorage.getItem('favorites');
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
        return teacher.id;
      });
      setFavorites(favoritedTeachersIds);
    }
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (subject === '') {
      Alert.alert('Alerta!', 'Voçê precisa preencher todos os campos');
      return;
    }
    await loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }, [subject, week_day, time]);

  const handleToggleFiltersVisible = useCallback((): void => {
    setIsFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Icon name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                />
              </View>
            </View>
            <RectButton onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        {teachers.length > 0 &&
          teachers.map((teacher: Teacher) => (
            <TheacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
