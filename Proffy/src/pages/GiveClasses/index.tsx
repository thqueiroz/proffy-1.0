import React, {useCallback} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import giveClassesBgIMage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses: React.FC = () => {
  const {goBack} = useNavigation();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={giveClassesBgIMage}
        resizeMode="contain"
        style={styles.content}>
        <Text style={styles.title}> Quer ser um Proffy? </Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={handleGoBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem.</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
