/* eslint-disable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { StylesProvider } from '@material-ui/core/styles';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import './styles/global.css';
import './styles/animations.css';

const instance = createInstance({
    urlBase: "https://matomo.ecogium.fr/matomo/",
    siteId: 1, // optional, default value: `1`
    trackerUrl: "https://matomo.ecogium.fr/matomo/matomo.php", // optional, default value: `${urlBase}matomo.php`
    srcUrl: "https://matomo.ecogium.fr/matomo/matomo.js" // optional, default value: `${urlBase}matomo.js`
  });

ReactDOM.render(
    <MatomoProvider value={instance}>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </MatomoProvider>,
    document.getElementById('root')
);
