import React, {useCallback, useState} from 'react';
import {View, Image, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import {RectButton} from 'react-native-gesture-handler';

import styles from './styles';

import heartIcon from '../../assets/icons/heart-outline.png';
import unfavoriteICon from '../../assets/icons/unfavorite.png';
import whatsappICon from '../../assets/icons/whatsapp.png';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TheacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsApp = useCallback((): void => {
    api.post('connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }, [teacher.whatsapp, teacher.id]);

  const handleToggleFavorite = useCallback(async (): Promise<void> => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex(
        (theacherItem: Teacher) => {
          return theacherItem.id === teacher.id;
        },
      );
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, [isFavorited, teacher]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{uri: teacher.avatar}} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>R${teacher.cost}</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {},
            ]}>
            {isFavorited ? (
              <Image source={unfavoriteICon} />
            ) : (
              <Image source={heartIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsApp}
            style={styles.contactButton}>
            <Image source={whatsappICon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TheacherItem;
