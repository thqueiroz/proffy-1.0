import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/icons/study.png';
import giveClassesIcon from '../../assets/icons/give-classes.png';
import heartIcon from '../../assets/icons/heart.png';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConecction] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadConnections() {
      const response = await api.get('connections');

      const {total} = response.data;

      setTotalConecction(total);
    }

    loadConnections();
  }, []);

  const handleNavigateToGiveClasses = useCallback(() => {
    navigation.navigate('GiveClasses');
  }, [navigation]);

  const handleNavigateToStudyPages = useCallback(() => {
    navigation.navigate('Study');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClasses}
          style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} de conexões já realidadas.{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
