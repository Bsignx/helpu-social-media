import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import Routes from './pages/Routes';

import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
