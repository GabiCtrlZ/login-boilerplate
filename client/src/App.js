import React from 'react';
import { SnackbarProvider } from 'notistack'

import AppRouter from './components/AppRouter'

function App(props) {

  return (
      <SnackbarProvider maxSnack={3} >
        <AppRouter/>
      </SnackbarProvider>
  );
}

export default App
