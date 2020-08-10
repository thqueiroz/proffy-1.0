/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TheacherItem, {Teacher} from '../../components/TheacherItem';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    const response = await AsyncStorage.getItem('favorites');
    if (response) {
      const favoritedTeachers = JSON.parse(response);

      setFavorites(favoritedTeachers);
    }
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        {favorites.map((teacher: Teacher) => {
          return <TheacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
