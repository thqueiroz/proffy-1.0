import React, {useCallback, ReactNode} from 'react';
import {View, Image, Text} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

import backIcon from '../../assets/icons/back.png';
import logo from '../../assets/images/logo.png';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const {navigate} = useNavigation();
  const handleGoBar = useCallback(() => {
    navigate('Landing');
  }, [navigate]);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBar}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logo} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        {headerRight}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
