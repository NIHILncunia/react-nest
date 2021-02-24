import React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';

// 컴포넌트 내에서 라우터를 사용하기 위해서는 브라우저 라우터를 사용해야한다.

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app')
);