import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/shared/store';
import { Mainnet, DAppProvider } from '@usedapp/core';

const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/14a0951f47e646c1b241aa533e150219',
    },
  }

ReactDOM.render(
    <Provider store={store}>
         <DAppProvider config={config}>
        <App />
        </DAppProvider>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
