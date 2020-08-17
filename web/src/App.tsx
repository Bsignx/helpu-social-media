import React from 'react';

import Routes from './pages/Routes';

import './styles/global.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;