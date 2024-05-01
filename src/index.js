// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'simplebar/src/simplebar.css';
import 'assets/third-party/apex-chart.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';

import App from './App';
import { store } from 'store';

import Snackbar from 'components/Snackbar';

// let persistor = persistStore(store);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <StrictMode>
  <ReduxProvider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <BrowserRouter>
      <App />
      <Snackbar />
    </BrowserRouter>
    {/* </PersistGate> */}
  </ReduxProvider>
  // </StrictMode>
);
