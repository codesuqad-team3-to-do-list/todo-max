import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { designSystem } from './styles/designSystem.ts';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './pages/Main';
import Sign from './pages/Sign';
import { LocalStorageKey } from './types/constants.ts';

export default function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(LocalStorageKey.AccessToken)
  );
  const isLogin = Boolean(accessToken);

  const setUserAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <BrowserRouter>
        <Header isLogin={isLogin} setUserAccessToken={ setUserAccessToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Sign type={'login'} setUserAccessToken={setUserAccessToken} isLogin={isLogin} />
            }
          />
          <Route path="/main" element={<Main accessToken={accessToken} />} />
          <Route path="/sign-up" element={<Sign type={'signUp'} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
