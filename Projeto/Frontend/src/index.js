import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';

//Para uso do redux é necessario a instalação dos seguintes modulor:
//react-redux e @reduxjs/toolkit

//installar no navegador
//react developer tools e redux devTools

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/*FORNECENDO UMA STORE PARA A APLICAÇÃO*/}
      <App />
    </Provider>
  </React.StrictMode>
);