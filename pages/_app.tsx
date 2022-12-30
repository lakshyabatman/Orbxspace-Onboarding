import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppProvider from '../context/AppContext';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { Spin } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
  const context = useContext(AppContext);
  const loading = context?.Loading;

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
