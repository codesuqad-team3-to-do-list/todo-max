import { useState } from 'react';
import Header from './components/header/Header';
import { ThemeProvider } from 'styled-components';
import { designSystem } from './styles/designSystem.ts';
import { GlobalStyles } from './styles/GlobalStyles.ts';

export default function App() {
  const [token, setToken] = useState();
  const isLogin = !!token;

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <Header isLogin={isLogin} />
    </ThemeProvider>
  );
}
