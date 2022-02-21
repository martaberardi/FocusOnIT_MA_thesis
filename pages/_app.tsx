import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {Amplify, AuthModeStrategyType} from 'aws-amplify';
import store from '../src/store';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';
import {createTheme, ThemeProvider} from "@mui/material";

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
});

const theme = createTheme({
  typography: {
    fontFamily: [
      'monospace',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const MyApp = function ({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <menu>
          <Link href="/">
            <a>Menù</a>
          </Link>
          <Link href="/user">
            <a>Utente</a>
          </Link>
          <Link href="/grammatica">
            <a>Grammatica</a>
          </Link>
          <Link href="/info">
            <a>Info</a>
          </Link>
        </menu>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
