// App.js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {DraggableModal} from './src/Components';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DraggableModal />
    </GestureHandlerRootView>
  );
}
