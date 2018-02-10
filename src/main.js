import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

import '../public/assets/css/reset.scss';
import '../public/assets/css/global.scss';

ReactDOM.render(router,document.getElementById('app'));