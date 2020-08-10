import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

import AppStack from './routes/AppStack';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppStack />
    </>
  );
};

export default App;
