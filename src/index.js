import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './app/style/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import BFoodTheme from './app/style/themes/bfood';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import searchApp from './app/store/reducers'

const store = createStore(searchApp);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={BFoodTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
